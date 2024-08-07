'use server';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { env } from '~/env';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import type { User } from '~/types';

const login_schema = z.object({
	email: z.string().email(),
	password: z.string(),
});

type LoginSchema = z.infer<typeof login_schema>;

type SuccessfulLogin = {
	success: true;
	user: User;
};

type UnsuccesfulLogin = {
	success: false;
	msg: string;
};

export async function login(
	login_creds: LoginSchema,
): Promise<SuccessfulLogin | UnsuccesfulLogin> {
	const res = login_schema.safeParse(login_creds);

	if (res.error)
		return {
			success: false,
			msg: 'Error en las credenciales',
		};

	const { email, password } = res.data;

	const db_user = (
		await db.select().from(users).where(eq(users.email, email)).execute()
	)[0];

	if (!db_user)
		return {
			success: false,
			msg: 'Usuario o contraseña incorrectos',
		};

	if (!(await bcrypt.compare(password, db_user.password_hash)))
		return {
			success: false,
			msg: 'Usuario o contraseña incorrectos',
		};

	const token = jwt.sign(
		{
			email: db_user.email,
			names: db_user.names,
			last_names: db_user.last_names,
			role: db_user.role,
			phone: db_user.phone,
		},
		env.JWT_SECRET,
	);

	cookies().set('token', token);

	return {
		success: true,
		user: {
			token,
			email: db_user.email,
			names: db_user.names,
			last_names: db_user.last_names,
			role: db_user.role,
			phone: db_user.phone,
		},
	};
}

export async function logout() {
	cookies().delete('token');
	return;
}

export async function get_user_creds(): Promise<
	{ success: false; msg: string } | { success: true; user: User }
> {
	const token = cookies().get('token')?.value;

	if (!token)
		return {
			success: false,
			msg: 'Usuario incorrecto',
		};

	try {
		const user = jwt.verify(token, env.JWT_SECRET) as Omit<User, 'token'>;
		return {
			success: true,
			user: {
				...user,
				token,
			},
		};
	} catch (err) {
		console.error(err);
		return {
			success: false,
			msg: 'Usuario incorrecto',
		};
	}
}
