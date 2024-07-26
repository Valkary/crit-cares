"use server";
import { eq, sql } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { db } from '~/server/db';

import { patient_documents, patients } from '~/server/db/schema';
import { validate_user_token } from '~/data/users/validate_user';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import ViewFileButton from '~/components/patients/view_file_button';

export default async function Page() {
    const token = cookies().get('token')?.value;

    if (!token)
        return redirect("/login?toast=error&msg=Usuario no definido");

    const doctor = await validate_user_token(token);

    if (!doctor)
        return <span>Acceso denegado</span>;

    const documents = await db.select({
        patient_name: sql<string>`CONCAT(${patients.names}, ' ', ${patients.last_names})`,
        file: { ...patient_documents },
    }).from(patients)
        .where(eq(patients.doctor_id, doctor.id))
        .innerJoin(patient_documents, eq(patient_documents.patient_id, patients.id));

    return <>
        <h1 className="text-2xl font-bold text-primary uppercase">Documentos</h1>
        <Table>
            <TableCaption>Tabla de documentos</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Ver</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    documents.map(doc => {
                        return <TableRow>
                            <TableCell>{doc.patient_name}</TableCell>
                            <TableCell>{doc.file.name}</TableCell>
                            <TableCell>{doc.file.creation_date?.toLocaleDateString("es-Mx")}</TableCell>
                            <TableCell><ViewFileButton file={doc.file} /></TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    </>
}