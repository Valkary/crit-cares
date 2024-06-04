
import { redirect } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../drizzle/db";
import { users } from "../../../../drizzle/schema";

export async function POST({ request }: APIEvent) {
    const form_data = await request.formData();
    const email = String(form_data.get("email"));
    const password = String(form_data.get("password"));

    console.log(email, password);

    try {
        const user = (await db.select().from(users).where(eq(users.email, email)).execute())[0];
        if (!user || password !== user.password_hash) throw new Error("Invalid login");
    
        return user;
    } catch (err) {
        return new Response("Error logging in", { status: 401 });
    }
}