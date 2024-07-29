'use server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NotepadText } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import type { PatientModel } from '~/data/patients/get_patients';
import { ModalButton } from '../ui/modal';
import CreateFollowupNote from './create_followup_note';
import EditPatient from './edit_patient_form';
import FollowupNoteHistory from './followup_notes_history';
import PatientFiles from './patient_files';
import UploadFile from './upload_file';

type Props = {
	patient_data: PatientModel;
};

export default async function DetailPatient({ patient_data }: Props) {
	const token = cookies().get('token')?.value;

	if (!token) return redirect('/login?toast=error&msg=Usuario no definido');

	return (
		<div className="w-full flex flex-col gap-2">
			<EditPatient patient_data={patient_data} />

			<h3 className="text-xl font-semibold text-primary mb-4">
				Notas de seguimiento
			</h3>

			<Tabs defaultValue="notes" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="notes">Notas de seguimiento</TabsTrigger>
					<TabsTrigger value="documents">Documentos</TabsTrigger>
				</TabsList>
				<TabsContent value="notes">
					<Suspense>
						<ModalButton
							modalContent={
								<CreateFollowupNote
									token={token}
									patient_id={patient_data.id}
								/>
							}
						>
							<NotepadText />
							Crear nota
						</ModalButton>
						<FollowupNoteHistory patient_id={patient_data.id} />
					</Suspense>
				</TabsContent>
				<TabsContent value="documents">
					<Suspense>
						<UploadFile token={token} patient_id={patient_data.id} />
						<PatientFiles patient_id={patient_data.id} />
					</Suspense>
				</TabsContent>
			</Tabs>
		</div>
	);
}
