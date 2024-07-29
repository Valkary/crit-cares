'use server'
import { get_patient_notes } from '~/data/followup_notes/get_followup_notes'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'
import DetailFollowupNote from './detail_followup_note_button'

export default async function FollowupNoteHistory({
	patient_id,
}: { patient_id: number }) {
	const notes = await get_patient_notes(patient_id)

	return (
		<Table>
			<TableCaption>Tabla de pacientes</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead />
					<TableHead>Título</TableHead>
					<TableHead>Expandir</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{notes.map((note) => {
					return (
						<TableRow key={note.id}>
							<TableCell>{note.creation_date?.toDateString()}</TableCell>
							<TableCell>{note.title}</TableCell>
							<TableCell>
								<DetailFollowupNote patient_id={patient_id} note={note} />
							</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
	)
}
