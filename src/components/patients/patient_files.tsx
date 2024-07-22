"use server";

import { get_patient_documents } from "~/data/files";
import ViewFileButton from "./view_file_button";

export default async function PatientFiles({ patient_id }: { patient_id: number }) {
    const res = await get_patient_documents(patient_id);
    if (!res.success) return <span>Error</span>
    
    const files = res.data;

    return <div className="overflow-x-auto">
        <table className="table table-zebra">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Fecha</th>
                    <th>Expandir</th>
                </tr>
            </thead>
            <tbody>
                {files.map(file => {
                    return <tr key={file.id}>
                        <th>{file.name}</th>
                        <td>{file.creation_date?.toLocaleDateString()}</td>
                        <td>
                            <ViewFileButton file={file} />
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}