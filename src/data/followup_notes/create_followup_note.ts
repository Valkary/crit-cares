"use server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import jwt from "jsonwebtoken";

import { follow_up_notes, users } from "~/server/db/schema";
import { CreationResult, FetchResult, User } from "~/types";
import { env } from "~/env";
import { db } from "~/server/db";

const create_followup_note_schema = z.object({
    user_token: z.string(),
    patient_id: z.number().int(),
    title: z.string(),
    description: z.string(),
});

type CreateFollowupNoteSchema = z.infer<typeof create_followup_note_schema>;

export async function create_followup_note(note: CreateFollowupNoteSchema): Promise<CreationResult> {
    const res = create_followup_note_schema.safeParse(note);

    if (res.error) return {
        success: false,
        error_msg: "Error in schema"
    };

    const { user_token, description, patient_id, title } = res.data;

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

        await db.insert(follow_up_notes).values({
            title,
            doctor_id: doctor.id,
            patient_id: patient_id,
            description
        });

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