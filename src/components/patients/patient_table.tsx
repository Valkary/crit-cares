"use client";
import { Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { User } from "~/context/auth"
import { PatientModel, get_doctor_patients } from "~/data/patients/get_patients"

export default function PatientTable({ user }: { user: User }) {
    const [patients, setPatients] = useState<PatientModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const drawerRef = useRef<HTMLInputElement>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    async function fetchDoctorPatients() {
        const req = await get_doctor_patients(user.token);
        if (req.success) setPatients(req.data);
    }

    useEffect(() => {
        fetchDoctorPatients();
    }, []);

    return <div className="overflow-x-auto">
        <div className="drawer">
            <input type="checkbox" className="drawer-toggle" checked={isDrawerOpen} />
            <div className="drawer-side">
                <div aria-label="close sidebar" className="drawer-overlay" onClick={() => setIsDrawerOpen(false)} />
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
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
                    patients.map(patient => {
                        return <tr>
                            <td>
                                <button
                                    onClick={() => setIsDrawerOpen(true)}
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
    </div>
}