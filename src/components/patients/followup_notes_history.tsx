"use server";
import { get_patient_notes } from "~/data/followup_notes/get_followup_notes";
import DetailFollowupNote from "./detail_followup_note_button";

export default async function FollowupNoteHistory({ patient_id }: { patient_id: number | null }) {
    if (patient_id === null) return <></>;

    const patient_notes = await get_patient_notes(patient_id);

    console.log("This should be in the server!");

    return <div className="overflow-x-auto">
        <table className="table table-zebra">
            <thead>
                <tr>
                    <th></th>
                    <th>Título</th>
                    <th>Expandir</th>
                </tr>
            </thead>
            <tbody>
                {patient_notes.map(note => {
                    return <tr key={note.id}>
                        <th>{note.creation_date?.toDateString()}</th>
                        <td>{note.title}</td>
                        <td>
                            <DetailFollowupNote patient_id={patient_id} note={note} />
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}