"use server"

import { sql, eq } from "drizzle-orm";
import { calculate_apache_score, get_survival_percentage } from "~/data/functions/apache_score";
import { db } from "~/server/db";
import { apache_scores, follow_up_notes, patients } from "~/server/db/schema";

export default async function DetailFollowupNote({ note_id }: { note_id: number }) {
    const patient_note = (await db.select({
        note_id: follow_up_notes.id,
        patient_id: patients.id,
        patient_name: sql<string>`concat(${patients.names},' ',${patients.last_names})`,
        note_title: follow_up_notes.title,
        note_description: follow_up_notes.description,
        note_date: follow_up_notes.creation_date,
        apache_score: {
            age: apache_scores.age,
            temperature: apache_scores.temperature,
            blood_pressure: apache_scores.blood_pressure,
            ph: apache_scores.ph,
            heart_rate: apache_scores.heart_rate,
            respiratory_rate: apache_scores.respiratory_rate,
            sodium: apache_scores.sodium,
            potassium: apache_scores.potassium,
            creatinine: apache_scores.creatinine,
        }
    }).from(follow_up_notes)
        .where(
            eq(follow_up_notes.id, note_id)
        )
        .innerJoin(patients,
            eq(patients.id, follow_up_notes.patient_id)
        )
        .leftJoin(apache_scores,
            eq(follow_up_notes.apache_score_id, apache_scores.id)
        )
    )[0];

    if (!patient_note) return <>Error fetching note</>

    return <div className="flex flex-col gap-2 w-full">
        <span>{patient_note.note_title}</span>
        <span>{patient_note.note_date?.toLocaleDateString()}</span>
        <span>{patient_note.note_description}</span>
        <span>Patient Name {patient_note.patient_name}</span>

        {
            patient_note.apache_score && <>
                <h3 className="font-bold text-lg">Apache Score: {
                    `${get_survival_percentage(calculate_apache_score(patient_note.apache_score))}%`
                }</h3>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Métrica</th>
                                <th>Medición</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Edad</td>
                                <td>{patient_note.apache_score.age} años</td>
                            </tr>
                            <tr>
                                <td>Temperatura</td>
                                <td>{patient_note.apache_score.temperature} °C</td>
                            </tr>
                            <tr>
                                <td>Presion arterial</td>
                                <td>{patient_note.apache_score.blood_pressure} mm Hg</td>
                            </tr>
                            <tr>
                                <td>pH</td>
                                <td>{patient_note.apache_score.ph}</td>
                            </tr>
                            <tr>
                                <td>Ritmo cardiaco</td>
                                <td>{patient_note.apache_score.heart_rate} / min</td>
                            </tr>
                            <tr>
                                <td>Ritmo respiratorio</td>
                                <td>{patient_note.apache_score.respiratory_rate} / min</td>
                            </tr>
                            <tr>
                                <td>Sodio</td>
                                <td>{patient_note.apache_score.sodium} mEq / L</td>
                            </tr>
                            <tr>
                                <td>Potasio</td>
                                <td>{patient_note.apache_score.potassium} mEq / L</td>
                            </tr>
                            <tr>
                                <td>Creatinina</td>
                                <td>{patient_note.apache_score.creatinine} mg / dL</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        }
    </div>
}