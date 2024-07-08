"use server";
import CreatePatient from "~/components/patients/create_patient";
import FollowupNoteHistory from "~/components/patients/followup_notes_history";
import PatientFiles from "~/components/patients/patient_files";
import PatientTable from "~/components/patients/patient_table";

export default async function Dashboard() {
    return <section className="flex flex-col gap-5 items-center">
        <CreatePatient />

        <div className="max-w-7xl">
            <PatientTable ServerComponent={[
                <FollowupNoteHistory patient_id={-1} />,
                <PatientFiles patient_id={-1} />
            ]} />
        </div>
    </section>
}