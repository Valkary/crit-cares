import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fromUnixTime } from 'date-fns';
import { db } from '~/server/db';
import { patients } from '~/server/db/schema';

async function insertPatients() {
	type NewPatient = typeof patients.$inferInsert;
	const file_path = path.join(process.cwd(), 'files/MOCK_DATA.json');
	const mock_data = JSON.parse(
		await readFile(file_path, 'utf8'),
	) as NewPatient[];

	console.log('LOADING PATIENT MOCK DATA');

	try {
		const new_mock_data: NewPatient[] = [];

		for (const p of mock_data) {
			new_mock_data.push({
				...p,
				phone: Number(p.phone),
				// @ts-ignore
				admission_date: fromUnixTime(p.admission_date),
				// @ts-ignore
				discharge_date: fromUnixTime(p.discharge_date),
				// @ts-ignore
				creation_date: fromUnixTime(p.creation_date),
			});
		}

		await db.insert(patients).values(new_mock_data);

		console.log('FINISHED LOADING PATIENT MOCK DATA');
	} catch (err) {
		console.error('ERROR LOADING PATIENT MOCK DATA');
		console.error(err);
	}
}

export async function GET(request: Request) {
	insertPatients();
	return Response.json({ success: true });
}
