"use server";

import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { NotepadText } from 'lucide-react';
import { Suspense } from 'react';

import FollowupNoteHistory from './followup_notes_history';
import EditPatient from "./edit_patient_form";
import CreateFollowupNote from './create_followup_note';
import { PatientModel } from "~/data/patients/get_patients";
import { ModalButton } from '../ui/modal';
import Tabs from '../ui/tabs';
import PatientFiles from './patient_files';
import UploadFile from './upload_file';

type Props = {
    patient_data: PatientModel,
};

type Tabs = "notes" | "documents";

export default async function DetailPatient({ patient_data }: Props) {
    const token = cookies().get('token')?.value;

    if (!token)
        return redirect("/login?toast=error&msg=Usuario no definido");

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-primary text-center mb-4">Perfil de Paciente</h2>
            <EditPatient patient_data={patient_data} />

            <h3 className="text-xl font-semibold text-primary mb-4">Notas de seguimiento</h3>


            <Tabs tabs={{
                notes: {
                    title: "Notas de seguimiento",
                    content: <>
                        <ModalButton modalContent={<CreateFollowupNote token={token} patient_id={patient_data.id} />}>
                            <NotepadText />
                            Crear nota
                        </ModalButton>
                        <FollowupNoteHistory patient_id={patient_data.id} />
                    </>,
                },
                documents: {
                    title: "Documentos",
                    content: <>
                        <UploadFile token={token} patient_id={patient_data.id} />
                        <PatientFiles patient_id={patient_data.id} />
                    </>
                }
            }} />

        </div>
    );
}
