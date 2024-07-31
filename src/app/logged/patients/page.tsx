'use server';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableRow,
} from '@/components/ui/table';
import { InfoIcon } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DetailPatient from '~/components/patients/detail_patient';
import Drawer from '~/components/ui/drawer';
import Filters from './filters';
import { validate_user_token } from '~/data/users/validate_user';
import { db } from '~/server/db';
import { and, eq, or, like, between, gte } from 'drizzle-orm';
import { patients } from '~/server/db/schema';
import { fromUnixTime } from 'date-fns';
import { z } from 'zod';

const patient_search_schema = z.object({
	search: z.string().optional(),
	page: z.coerce.number().optional(),
	exitus_letalis: z.enum(['todos', 'true', 'false']).optional(),
	mechanical_ventilation: z.enum(['todos', 'true', 'false']).optional(),
	discharged: z.enum(['todos', 'true', 'false']).optional(),
	admission_from: z.coerce.number().optional(),
	admission_to: z.coerce.number().optional(),
	discharged_from: z.coerce.number().optional(),
	discharged_to: z.coerce.number().optional(),
});

export type PatientSearchParams = z.infer<typeof patient_search_schema>;

const row_limit = 10;

export default async function Page({
	searchParams,
}: {
	searchParams: PatientSearchParams;
}) {
	const token = cookies().get('token')?.value;
	const doctor = await validate_user_token(token);

	if (!doctor) return redirect('/login?toast=error&msg=Usuario no definido');

	const {
		page,
		search,
		discharged,
		mechanical_ventilation,
		exitus_letalis,
		admission_from,
		admission_to,
		discharged_from,
		discharged_to,
	} = searchParams;

	const conditions = [];

	if (search)
		conditions.push(
			or(
				like(patients.names, `%${search ?? ''}%`),
				like(patients.last_names, `%${search ?? ''}%`),
				like(patients.phone, `%${search ?? ''}%`),
			),
		);

	if (discharged && discharged !== 'todos')
		conditions.push(eq(patients.discharged, discharged === 'true'));

	if (mechanical_ventilation && mechanical_ventilation !== 'todos')
		conditions.push(
			eq(patients.mechanical_ventilation, mechanical_ventilation === 'true'),
		);

	if (exitus_letalis && exitus_letalis !== 'todos')
		conditions.push(eq(patients.exitus_letalis, exitus_letalis === 'true'));

	if (admission_from && admission_to)
		conditions.push(
			between(
				patients.admission_date,
				fromUnixTime(admission_from),
				fromUnixTime(admission_to),
			),
		);
	else if (admission_from)
		conditions.push(gte(patients.admission_date, fromUnixTime(admission_from)));

	if (discharged_from && discharged_to)
		conditions.push(
			between(
				patients.discharge_date,
				fromUnixTime(discharged_from),
				fromUnixTime(discharged_to),
			),
		);
	else if (discharged_from)
		conditions.push(
			gte(patients.discharge_date, fromUnixTime(discharged_from)),
		);

	const filtered_patients = db
		.select()
		.from(patients)
		.where(and(eq(patients.doctor_id, doctor.id), ...conditions));

	const total_pages = Math.ceil((await filtered_patients).length / row_limit);

	const db_patients = await filtered_patients
		.limit(row_limit)
		.offset(!page ? 0 : page * row_limit);

	return (
		<Table>
			<TableCaption>Tabla de pacientes</TableCaption>
			<Filters
				page={Number(searchParams?.page) || 0}
				total_pages={total_pages}
			/>
			<TableBody>
				{db_patients.map((patient) => {
					return (
						<TableRow key={patient.id}>
							<TableCell>
								<Drawer trigger={<InfoIcon />} title="Perfil del Paciente">
									<DetailPatient patient_data={patient} />
								</Drawer>
							</TableCell>
							<TableCell>{patient.names}</TableCell>
							<TableCell>{patient.last_names}</TableCell>
							<TableCell>{patient.age}</TableCell>
							<TableCell>{patient.phone}</TableCell>
							<TableCell>
								{patient.admission_date.toLocaleDateString('es-Mx')}
							</TableCell>
							<TableCell>
								{patient.mechanical_ventilation ? 'Si' : 'No'}
							</TableCell>
							<TableCell>{patient.exitus_letalis ? 'Si' : 'No'}</TableCell>
							<TableCell>{patient.discharged ? 'Si' : 'No'}</TableCell>
							<TableCell>
								{patient.discharge_date?.toLocaleDateString('es-Mx') ?? '-'}
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
