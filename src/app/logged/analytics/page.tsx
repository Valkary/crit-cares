'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { validate_user_token } from '~/data/users/validate_user';
import PatientAnalytics from './patient_analytics';
import { db } from '~/server/db';
import { patients } from '~/server/db/schema';
import { gte, sql } from 'drizzle-orm';
import { addMonths } from 'date-fns';

type WithDate = { month: string };
type Admissions = { admissions: number };
type Discharges = { discharges: number };

function merge_objects_by_date(
	obj1: (Admissions & WithDate)[],
	obj2: (Discharges & WithDate)[],
) {
	const merged_object: (WithDate & Admissions & Discharges)[] = [];

	for (const admission of obj1) {
		merged_object.push({ ...admission, discharges: 0 });
	}

	for (const discharge of obj2) {
		const id = merged_object.findIndex((obj) => obj.month === discharge.month);

		if (merged_object[id]) {
			merged_object[id].discharges += discharge.discharges;
		} else {
			merged_object.push({ ...discharge, admissions: 0 });
		}
	}

	const sorted = merged_object.sort(
		(a, b) => new Date(a.month).getTime() - new Date(b.month).getTime(),
	);
	return sorted;
}

export default async function Page() {
	const token = cookies().get('token')?.value;
	const doctor = await validate_user_token(token);

	if (!doctor) return redirect('/login?toast=error&msg=Usuario no definido');

	const monthlyAdmissions = await db
		.select({
			month:
				sql<string>`strftime('%Y-%m', datetime(${patients.admission_date}, 'unixepoch'))`.as(
					'month',
				),
			admissions: sql<number>`COUNT(*)`,
		})
		.from(patients)
		.where(gte(patients.admission_date, addMonths(new Date(), -12)))
		.groupBy(
			sql`strftime('%Y-%m', datetime(${patients.admission_date}, 'unixepoch'))`,
		)
		.orderBy(
			sql`strftime('%Y-%m', datetime(${patients.admission_date}, 'unixepoch'))`,
		);

	const monthlyDischarges = await db
		.select({
			month:
				sql<string>`strftime('%Y-%m', datetime(${patients.discharge_date}, 'unixepoch'))`.as(
					'month',
				),
			discharges: sql<number>`COUNT(*)`,
		})
		.from(patients)
		.where(gte(patients.discharge_date, addMonths(new Date(), -12)))
		.groupBy(
			sql`strftime('%Y-%m', datetime(${patients.discharge_date}, 'unixepoch'))`,
		)
		.orderBy(
			sql`strftime('%Y-%m', datetime(${patients.discharge_date}, 'unixepoch'))`,
		);

	const monthlyData = merge_objects_by_date(monthlyAdmissions, monthlyDischarges);

	return <PatientAnalytics chart_data={monthlyData} />;
}
