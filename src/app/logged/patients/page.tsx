'use server';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
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

export type PatientSearchParams = {
	search?: string;
	page?: number;
	exitus_letalis?: 'todos' | 'true' | 'false';
	mechanical_ventilation?: 'todos' | 'true' | 'false';
	discharged?: 'todos' | 'true' | 'false';
	admission?: [number, number] | [number, null];
	discharge?: [number, number] | [number, null];
};

const row_limit = 5;

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
		admission,
	} = searchParams || {};

	const conditions = [];

	if (search)
		conditions.push(
			or(
				like(patients.names, `%${searchParams?.search ?? ''}%`),
				like(patients.last_names, `%${searchParams?.search ?? ''}%`),
				like(patients.phone, `%${searchParams?.search ?? ''}%`),
			),
		);

	if (discharged && discharged !== 'todos')
		conditions.push(
			eq(patients.discharged, searchParams.discharged === 'true'),
		);

	if (mechanical_ventilation && mechanical_ventilation !== 'todos')
		conditions.push(
			eq(
				patients.mechanical_ventilation,
				searchParams.mechanical_ventilation === 'true',
			),
		);

	if (exitus_letalis && exitus_letalis !== 'todos')
		conditions.push(
			eq(patients.exitus_letalis, searchParams.exitus_letalis === 'true'),
		);

	if (admission) {
		// @ts-ignore
		const dates = admission.split(',').map((d) => fromUnixTime(Number(d))) as [
			Date,
			Date,
		];

		if (!admission[1]) {
			console.log(dates[0]);
			conditions.push(gte(patients.admission_date, dates[0]));
		} else {
			conditions.push(between(patients.admission_date, dates[0], dates[1]));

			console.log(dates[0], dates[1]);
		}
	}

	const filtered_patients = db
		.select()
		.from(patients)
		.where(and(eq(patients.doctor_id, doctor.id), ...conditions));

	const total_pages = Math.ceil((await filtered_patients).length / row_limit);

	const db_patients = await filtered_patients
		.limit(row_limit)
		.offset(!page ? 0 : page * row_limit);

	return (
		<>
			<h1 className="text-2xl font-bold text-primary uppercase">Pacientes</h1>
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
									{patient.discharge_date?.toISOString() ?? '-'}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</>
	);
}
