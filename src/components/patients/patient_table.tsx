"use client";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "~/context/auth"
import { PatientModel, get_doctor_patients } from "~/data/patients/get_patients"
import DetailPatient from "./detail_patient";

export default function PatientTable({ ServerComponent }: { ServerComponent: React.ReactNode[] }) {
    const { user } = useAuth();
    const [patients, setPatients] = useState<PatientModel[]>([]);
    const [patientID, setPatientID] = useState<number | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    function openPatientDetailView(patient_id: number) {
        setPatientID(patient_id);
        setIsDrawerOpen(true);
    }

    function closeDrawer() {
        setIsDrawerOpen(false);
    }

    useEffect(() => {
        (async () => {
            if (!user) return;
            const req = await get_doctor_patients(user.token);
            if (req.success) setPatients(req.data);
        })();
    }, [user]);

    return <div className="overflow-x-auto">
        <div className="drawer drawer-end z-20">
            <input type="checkbox" className="drawer-toggle" readOnly checked={isDrawerOpen} />
            <div className="drawer-side">
                <div aria-label="close sidebar" className="drawer-overlay" onClick={() => setIsDrawerOpen(false)} />
                <ul className="menu bg-base-200 text-base-content min-h-full w-full md:w-2/3 lg:w-1/2 p-4">
                    {patientID !== null && <DetailPatient closeDrawer={closeDrawer} patient_data={patients[patientID] as PatientModel} />}
                </ul>
            </div>
        </div>

        <table className="table table-xs table-pin-rows table-zebra">
            <thead>
                <tr>
                    <th></th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Edad</th>
                    <th>Teléfono</th>
                    <th>Admisión</th>
                    <th>Ventilación</th>
                    <th>Exitus Letalis</th>
                    <th>Alta</th>
                    <th>Fecha alta</th>
                </tr>
            </thead>
            <tbody>
                {
                    patients.map((patient, idx) => {
                        return <tr key={patient.id}>
                            <td>
                                <button
                                    onClick={() => openPatientDetailView(idx)}
                                    className="btn btn-ghost btn-info btn-circle"
                                >
                                    <Info />
                                </button>
                            </td>
                            <td>{patient.names}</td>
                            <td>{patient.last_names}</td>
                            <td>{patient.age}</td>
                            <td>{patient.phone}</td>
                            <td>{patient.admission_date.toLocaleDateString("es-Mx")}</td>
                            <td>{patient.mechanical_ventilation ? "Si" : "No"}</td>
                            <td>{patient.exitus_letalis ? "Si" : "No"}</td>
                            <td>{patient.discharged ? "Si" : "No"}</td>
                            <td>{patient.discharge_date?.toISOString() ?? "-"}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        {ServerComponent}
    </div>
}