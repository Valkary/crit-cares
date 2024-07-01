"use server"

import { sql, eq } from "drizzle-orm";
import { db } from "~/server/db";
import { follow_up_notes, patients } from "~/server/db/schema";

export default async function DetailFollowupNote({ note_id }: { note_id: number }) {
    const patient_note = (await db.select({
        note_id: follow_up_notes.id,
        patient_id: patients.id,
        patient_name: sql<string>`concat(${patients.names},' ',${patients.last_names})`,
        note_title: follow_up_notes.title,
        note_description: follow_up_notes.description,
        note_date: follow_up_notes.creation_date,
    }).from(follow_up_notes)
        .where(
            eq(follow_up_notes.id, note_id)
        )
        .innerJoin(patients,
            eq(patients.id, follow_up_notes.patient_id)
        ))[0];

    if (!patient_note) return <>Error fetching note</>

    
    return <div className="flex flex-col gap-2">
        <span>{patient_note.note_title}</span>
        <span>{patient_note.note_date?.toLocaleDateString()}</span>
        <span>{patient_note.note_description}</span>
        <span>Patient Name {patient_note.patient_name}</span>
    </div>
}