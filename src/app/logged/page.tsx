"use server";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { get_doctor_patients } from "~/data/patients/get_patients";
import { DrawerButton } from '~/context/drawer';
import DetailPatient from '~/components/patients/detail_patient';
import { Info } from 'lucide-react';

export default async function Page() {
    const token = cookies().get('token')?.value;

    if (!token)
        return redirect("/login?toast=error&msg=Usuario no definido");

    const req = await get_doctor_patients(token);

    if (!req.success) return <span>User error</span>
    const patients = req.data;

    return <table className="table table-xs table-pin-rows table-zebra">
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
                    return <tr key={patient.id}>
                        <td>
                            <DrawerButton className="btn btn-ghost btn-info btn-circle" drawerContent={<DetailPatient patient_data={patient} />}>
                                <Info />
                            </DrawerButton>
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
}