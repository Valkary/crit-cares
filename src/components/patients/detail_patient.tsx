"use client";
import { PatientModel } from "~/data/patients/get_patients";
import EditPatient from "./edit_patient_form";
import CreateFollowupNote from "./create_followup_note";
import { User, useAuth } from "~/context/auth";

export default function DetailPatient({ patient_data }: { patient_data: PatientModel }) {
    const { user } = useAuth();

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-primary text-center mb-4">Perfil de Paciente</h2>
            <EditPatient patient_data={patient_data} />
            <h3 className="text-xl font-semibold text-primary mb-4">Notas de seguimiento</h3>
            <CreateFollowupNote user={user as User} patient_id={patient_data.id} />
        </div>
    );
}