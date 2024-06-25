"use client"
import CreatePatient from "~/components/patients/create_patient";
import PatientTable from "~/components/patients/patient_table";
import { useAuth } from "~/context/auth"


export default function Dashboard() {
    const { user } = useAuth();

    if (!user) return <></>

    return <>
        Welcome to your dashboard!
        <CreatePatient user={user} />
        <PatientTable user={user} />
    </>
}