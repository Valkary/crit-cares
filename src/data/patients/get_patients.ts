'use server';

import { type InferSelectModel, and, eq, like, or } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { env } from '~/env';
import { db } from '~/server/db';
import { patients, users } from '~/server/db/schema';
import type { FetchResult, User } from '~/types';

export type PatientModel = InferSelectModel<typeof patients>;

type PatientSearchParams = {
	search?: string,
	page?: number,
}

export async function get_doctor_patients(
	token: string,
	search_params: PatientSearchParams,
): Promise<FetchResult<PatientModel>> {
	try {
		const { email } = jwt.verify(token, env.JWT_SECRET) as User;
		const doctor = (
			await db.select().from(users).where(eq(users.email, email))
		)[0];

		if (!doctor)
			return {
				success: false,
				error_msg: 'Este usuario no puede crear pacientes',
			};

		const db_patients = await db
			.select()
			.from(patients)
			.where(
				and(
					eq(patients.doctor_id, doctor.id),
					or(
						like(patients.names, `%${search_params?.search}%`),
						like(patients.last_names, `%${search_params?.search}%`),
						like(patients.phone, `%${search_params?.search}%`),
						like(patients.age, `%${search_params?.search}%`),
					)
				)
			).limit(10).offset(!search_params?.page ? 0 : search_params.page * 10);

		return {
			success: true,
			data: db_patients,
		};
	} catch (err) {
		return {
			success: false,
			error_msg: 'Usuario equivocado',
		};
	}
}
