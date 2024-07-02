"use server";

import { get_patient_documents } from "~/data/files";

export default async function PatientFiles({ patient_id }: { patient_id: number }) {
    const res = await get_patient_documents(patient_id);
    if (!res.success) return <span>Error!</span>

    const files = res.data;

    return <div className="overflow-x-auto">
        <table className="table table-zebra">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tamaño</th>
                </tr>
            </thead>
            <tbody>
                {files.map(file => {
                    return <tr>
                        <th>{file.name}</th>
                        <td>{file.size / 1000} Kb</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}