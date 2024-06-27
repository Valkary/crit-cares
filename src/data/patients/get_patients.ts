"use server";

import jwt from "jsonwebtoken";
import { env } from "~/env";
import { FetchResult, User } from "~/types";
import { patients, users } from "~/server/db/schema";
import { InferSelectModel, eq } from "drizzle-orm";
import { db } from "~/server/db";

export type PatientModel = InferSelectModel<typeof patients>;

export async function get_doctor_patients(token: string): Promise<FetchResult<PatientModel>> {
    try {
        const { email, role } = jwt.verify(token, env.JWT_SECRET) as User;
        const doctor = (await db.select().from(users).where(eq(users.email, email)))[0];

        if (!doctor)
            return {
                success: false,
                error_msg: "Este usuario no puede crear pacientes"
            };

        const db_patients = await db.select().from(patients).where(eq(patients.doctor_id, doctor.id));

        return {
            success: true,
            data: db_patients
        };

    } catch (err) {
        return {
            success: false,
            error_msg: "Usuario equivocado"
        }
    }
}