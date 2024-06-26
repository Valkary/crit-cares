"use client"
import CreatePatient from "~/components/patients/create_patient";
import PatientTable from "~/components/patients/patient_table";
import { useAuth } from "~/context/auth"

export default function Dashboard() {
    const { user } = useAuth();

    if (!user) return <></>

    return <section className="flex flex-col gap-5 items-center">
        <CreatePatient user={user} />

        <div className="max-w-7xl">
            <PatientTable user={user} />
        </div>
    </section>
}