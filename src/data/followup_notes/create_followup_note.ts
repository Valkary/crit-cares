"use server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import jwt from "jsonwebtoken";

import { apache_scores, follow_up_notes, users } from "~/server/db/schema";
import { CreationResult, FetchResult, User } from "~/types";
import { env } from "~/env";
import { db } from "~/server/db";

const apacheScoreObjSchema = z.object({
    age: z.number(),
    temperature: z.number(),
    blood_pressure: z.number(),
    ph: z.number(),
    heart_rate: z.number(),
    respiratory_rate: z.number(),
    sodium: z.number(),
    potassium: z.number(),
    creatinine: z.number(),
});

const schemaWithoutApacheScore = z.object({
    user_token: z.string(),
    patient_id: z.number().int(),
    title: z.string(),
    description: z.string(),
    apache_score: z.literal(false),
    apache_score_obj: z.null(),
});

const schemaWithApacheScore = z.object({
    user_token: z.string(),
    patient_id: z.number().int(),
    title: z.string(),
    description: z.string(),
    apache_score: z.literal(true),
    apache_score_obj: apacheScoreObjSchema,
});

const create_followup_note_schema = z.union([schemaWithoutApacheScore, schemaWithApacheScore]);
type CreateFollowupNoteSchema = z.infer<typeof create_followup_note_schema>;

export async function create_followup_note(note: CreateFollowupNoteSchema): Promise<CreationResult> {
    const res = create_followup_note_schema.safeParse(note);

    if (res.error) return {
        success: false,
        error_msg: "Error in schema"
    };

    const { user_token, description, patient_id, title, apache_score, apache_score_obj } = res.data;

    try {
        const { email } = jwt.verify(user_token, env.JWT_SECRET) as User;
        const doctor = (await db.select().from(users).where(eq(users.email, email)))[0];

        if (!doctor) return {
            success: false,
            error_msg: "Usuario erroneo"
        };

        if (doctor.role === "readonly") return {
            success: false,
            error_msg: "Readonly user"
        };

        if (apache_score) {
            const apache_score_row = (await db.insert(apache_scores).values({
                patient_id,
                ...apache_score_obj
            }).returning())[0];

            if (!apache_score_row)
                return {
                    success: false,
                    error_msg: "Error creating followup note"
                };

            await db.insert(follow_up_notes).values({
                title,
                doctor_id: doctor.id,
                patient_id: patient_id,
                description,
                apache_score_id: apache_score_row.id
            });
        } else {
            await db.insert(follow_up_notes).values({
                title,
                doctor_id: doctor.id,
                patient_id: patient_id,
                description
            });
        }

        return {
            success: true,
            msg: "Follow up note successfully created"
        };
    } catch (err) {
        return {
            success: false,
            error_msg: "Error creating followup note"
        };
    }

}