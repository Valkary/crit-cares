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
import CreatePatientModalButton from './create_patient_button';
import Filters from './filters';
import { validate_user_token } from '~/data/users/validate_user';
import { db } from '~/server/db';
import { and, eq, or, like } from 'drizzle-orm';
import { patients } from '~/server/db/schema';

export type PatientSearchParams = {
	search?: string;
	page?: number;
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

	const filtered_patients = db
		.select()
		.from(patients)
		.where(
			and(
				eq(patients.doctor_id, doctor.id),
				or(
					like(patients.names, `%${searchParams?.search ?? ''}%`),
					like(patients.last_names, `%${searchParams?.search ?? ''}%`),
					like(patients.phone, `%${searchParams?.search ?? ''}%`),
				),
			),
		);

	const total_pages = Math.ceil((await filtered_patients).length / row_limit);

	const db_patients = await filtered_patients
		.limit(row_limit)
		.offset(!searchParams?.page ? 0 : searchParams.page * row_limit);

	return (
		<>
			<h1 className="text-2xl font-bold text-primary uppercase">Pacientes</h1>
			<Table>
				<TableCaption>Tabla de pacientes</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead colSpan={10}>
							<CreatePatientModalButton />
						</TableHead>
					</TableRow>
					<TableRow>
						<TableHead colSpan={10}>
							<Filters page={Number(searchParams?.page) || 0} total_pages={total_pages} />
						</TableHead>
					</TableRow>
					<TableRow>
						<TableHead />
						<TableHead>Nombres</TableHead>
						<TableHead>Apellidos</TableHead>
						<TableHead>Edad</TableHead>
						<TableHead>Teléfono</TableHead>
						<TableHead>Admisión</TableHead>
						<TableHead>Ventilación</TableHead>
						<TableHead>Exitus Letalis</TableHead>
						<TableHead>Alta</TableHead>
						<TableHead>Fecha alta</TableHead>
					</TableRow>
				</TableHeader>
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
