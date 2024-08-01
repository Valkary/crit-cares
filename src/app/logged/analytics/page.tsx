'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { validate_user_token } from '~/data/users/validate_user';
import PatientAnalytics from './patient_analytics';
import { db } from '~/server/db';
import { patients } from '~/server/db/schema';
import { gte, sql } from 'drizzle-orm';
import { addMonths } from 'date-fns';

export default async function Page() {
	const token = cookies().get('token')?.value;
	const doctor = await validate_user_token(token);

	if (!doctor) return redirect('/login?toast=error&msg=Usuario no definido');

	const from_date = addMonths(new Date(), -12);

	const monthly_admissions = db
		.select({
			month:
				sql<string>`strftime('%Y-%m', datetime(${patients.admission_date}, 'unixepoch'))`.as(
					'month',
				),
			admissions: sql<number>`COUNT(*)`.as('admissions'),
		})
		.from(patients)
		.where(gte(patients.admission_date, from_date))
		.groupBy(
			sql`strftime('%Y-%m', datetime(${patients.admission_date}, 'unixepoch'))`,
		)
		.as('a');

	const monthly_discharges = db
		.select({
			month:
				sql<string>`strftime('%Y-%m', datetime(${patients.discharge_date}, 'unixepoch'))`.as(
					'month',
				),
			discharges: sql<number>`COUNT(*)`.as('discharges'),
		})
		.from(patients)
		.where(gte(patients.discharge_date, from_date))
		.groupBy(
			sql`strftime('%Y-%m', datetime(${patients.discharge_date}, 'unixepoch'))`,
		)
		.as('d');

	const monthly_data = await db
		.select({
			month: sql<string>`COALESCE(a.month, d.month)`.as('month'),
			admissions: sql<number>`COALESCE(a.admissions, 0)`.as('admissions'),
			discharges: sql<number>`COALESCE(d.discharges, 0)`.as('discharges'),
		})
		.from(monthly_admissions)
		.fullJoin(monthly_discharges, sql`a.month = d.month`)
		.orderBy(sql`month`);

	return <PatientAnalytics chart_data={monthly_data} />;
}
