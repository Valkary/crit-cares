"use server";

import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

import { env } from "~/env";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { User } from "~/types";

export async function validate_user_token(token: string) {
    const { email } = jwt.verify(token, env.JWT_SECRET) as User;
    const doctor = (await db.select().from(users).where(eq(users.email, email)))[0];

    return doctor ?? null;
}