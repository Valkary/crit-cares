"use client"
import PatientTable from "~/components/patients/patient_table";
import { useAuth } from "~/context/auth"


export default function Dashboard() {
    const { user } = useAuth();
    


    return <>
        Welcome to your dashboard!
        <PatientTable />
    </>
}