"use server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { env } from "~/env";
import { db } from "~/server/db";
import { patients, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { CreationResult, User } from "~/types";

const register_patient_schema = z.object({
    user_token: z.string(),
    names: z.string(),
    last_names: z.string(),
    age: z.number().min(0),
    phone: z.number(),
    admission_date: z.date(),
    mechanical_ventilation: z.boolean(),
    exitus_letalis: z.boolean(),
    discharged: z.boolean(),
});

type RegisterPatientSchema = z.infer<typeof register_patient_schema>;

export async function registerPatient(patient: RegisterPatientSchema): Promise<CreationResult> {
    const parse_result = register_patient_schema.safeParse(patient);

    if (parse_result.error)
        return {
            success: false,
            error_msg: JSON.stringify(parse_result.error)
        }

    const { names, last_names, user_token, age, admission_date, discharged, exitus_letalis, mechanical_ventilation, phone } = parse_result.data;

    // Check user edit capabilities
    try {
        const { email, role } = jwt.verify(user_token, env.JWT_SECRET) as User;
        
        // TODO: this should be a lookup table
        if (role === "readonly")
            return {
                success: false,
                error_msg: "Este usuario no puede crear pacientes"
            };

        const doctor = (await db.select().from(users).where(eq(users.email, email)).execute())[0];

        if (!doctor)
            return {
                success: false,
                error_msg: "Este usuario no puede crear pacientes"
            };

        const patient_id = (await db.insert(patients).values({
            names,
            last_names,
            admission_date,
            age,
            phone,
            discharged,
            exitus_letalis,
            mechanical_ventilation,
            doctor_id: doctor.id,
        }).returning())[0];

        if (!patient_id)
            return {
                success: false,
                error_msg: "Error creando paciente en la base de datos"
            };

        return {
            success: true,
            msg: `Paciente creado correctamente en la base de datos con id: ${patient_id.id}`
        };
    } catch (err) {
        return {
            success: false,
            error_msg: "Token incorrecto"
        };
    }
}