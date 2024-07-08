"use client";

import { PatientModel } from "~/data/patients/get_patients";
import EditPatient from "./edit_patient_form";
import CreateFollowupNote from "./create_followup_note";
import { User, useAuth } from "~/context/auth";
import { Suspense, useState } from "react";
import FollowupNoteHistory from "./followup_notes_history";
import UploadFile from "./upload_file";
import PatientFiles from "./patient_files";

type Props = {
    patient_data: PatientModel | null
};

type Tabs = "notes" | "documents";

export default function DetailPatient({ patient_data }: Props) {
    const { user } = useAuth();
    const [tab, setTab] = useState<Tabs>("notes");

    if (!patient_data) return <span>No patient data!</span>

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-primary text-center mb-4">Perfil de Paciente</h2>
            <EditPatient patient_data={patient_data} />
            
            <div role="tablist" className="tabs tabs-boxed">
                <a role="tab"
                    className={`tab ${tab === "notes" && "tab-active"}`}
                    onClick={() => setTab("notes")}
                >
                    Notas de seguimiento
                </a>
                <a role="tab"
                    className={`tab ${tab === "documents" && "tab-active"}`}
                    onClick={() => setTab("documents")}
                >
                    Documentos
                </a>
            </div>

            {
                tab === "notes" && <>
                    <h3 className="text-xl font-semibold text-primary mb-4">Notas de seguimiento</h3>
                    <CreateFollowupNote user={user as User} patient_id={patient_data.id} />
                    <Suspense fallback={<span>loading...</span>}>
                        <FollowupNoteHistory patient_id={patient_data.id} />
                    </Suspense>
                </>
            }

            {
                tab === "documents" && <>
                    <h3 className="text-xl font-semibold text-primary mb-4">Documentos</h3>
                    <UploadFile patient_id={patient_data.id} user={user as User} />
                    <Suspense fallback={<span>loading...</span>}>
                        <PatientFiles patient_id={patient_data.id} />
                    </Suspense>
                </>
            }
        </div>
    );
}
