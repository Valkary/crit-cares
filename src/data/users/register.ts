"use server";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { register_schema, RegisterSchema } from "../schemas";

export async function registerUser(data: RegisterSchema) {
    const res = register_schema.safeParse(data);

    if (res.error)
        return {
            success: false,
            msg: "Error en alguno de los campos"
        };

    const { email, names, last_names, password, role, phone } = res.data;

    const email_exists = (await db.select().from(users).where(eq(users.email, email)).execute()).length;

    if (email_exists)
        return {
            success: false,
            msg: "El usuario ya existe en la base de datos!"
        };

    try {
        const password_hash = await bcrypt.hash(password, 10);

        await db.insert(users).values({
            email,
            phone,
            names,
            last_names,
            password_hash,
            role,
            creation_date: new Date()
        });

        console.log("[SERVER]: Successfully registered new user in database!");
        return {
            success: true,
            msg: "Usuario creado con éxito en la base de datos!"
        };
    } catch (err) {
        console.error("[SERVER]: ERROR REGISTERING NEW USER IN DB");
        console.error(err);
        return {
            success: false,
            msg: "Error al crear usuario en la base de datos!"
        };
    }
}
