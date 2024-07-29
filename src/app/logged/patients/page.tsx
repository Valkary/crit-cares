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
import { get_doctor_patients } from '~/data/patients/get_patients';
import CreatePatientModalButton from './create_patient_button';

export default async function Page() {
	const token = cookies().get('token')?.value;

	if (!token) return redirect('/login?toast=error&msg=Usuario no definido');

	const req = await get_doctor_patients(token);

	if (!req.success) return <span>User error</span>;
	const patients = req.data;

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
					{patients.map((patient) => {
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
