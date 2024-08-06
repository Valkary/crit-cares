import { fromUnixTime } from 'date-fns';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { db } from '~/server/db';
import { patients, user_roles, users } from '~/server/db/schema';

type InsertResult = {
	success: boolean;
	table: string;
};

async function insert_roles(): Promise<InsertResult> {
	try {
		const roles = [
			{ name: 'admin', read: true, write: true, update: true, delete: true },
			{ name: 'doctor', read: true, write: true, update: true },
			{ name: 'secretary', read: true, write: true, update: true },
			{ name: 'readonly', read: true },
		];

		await db.insert(user_roles).values(roles);
		return { success: true, table: 'roles' };
	} catch (err) {
		console.error('Error inserting roles:', err);
		return { success: false, table: 'roles' };
	}
}

async function insert_mock_users(): Promise<InsertResult> {
	try {
		const users_to_insert = [
			{
				id: 1,
				email: 'pepoclesng@gmail.com',
				names: 'José',
				last_names: 'Salcedo Uribe',
				password_hash:
					'$2b$10$nYGzjjLbJvnArqQdIgeNzeLwd1hm.xE63Ub0URpi21aYhf5jdaDly',
				role_id: 1,
				phone: '3310649490',
				creation_date: fromUnixTime(1722457269),
			},
		];

		await db.insert(users).values(users_to_insert);
		return { success: true, table: 'users' };
	} catch (err) {
		console.error('Error inserting users:', err);
		return { success: false, table: 'users' };
	}
}

async function insert_mock_patients(): Promise<InsertResult> {
	try {
		const file_path = path.join(process.cwd(), 'files/MOCK_DATA.json');
		const mock_data = JSON.parse(await readFile(file_path, 'utf8'));

		type NewPatient = typeof patients.$inferInsert;
		type JSONPatient = Omit<NewPatient, 'admission_date' | 'discharge_date' | 'creation_date'> & {
			admission_date: number;
			discharge_date: number;
			creation_date: number;
		};

		const new_mock_data = mock_data.map((p: JSONPatient) => ({
			...p,
			admission_date: fromUnixTime(p.admission_date),
			discharge_date: p.discharge_date ? fromUnixTime(p.discharge_date) : null,
			creation_date: fromUnixTime(p.creation_date),
		}));

		await db.insert(patients).values(new_mock_data);
		return { success: true, table: 'patients' };
	} catch (err) {
		console.error('Error inserting patients:', err);
		return { success: false, table: 'patients' };
	}
}

async function execute_migration() {
	const funcs = [insert_roles, insert_mock_users, insert_mock_patients];
	const table_successes: string[] = [];
	const table_failures: string[] = [];

	for (const f of funcs) {
		try {
			const result = await f();
			if (result.success) {
				table_successes.push(result.table);
			} else {
				table_failures.push(result.table);
			}
		} catch (err) {
			console.error('Unexpected error during migration:', err);
			// Handle unexpected errors separately if needed
		}
	}

	console.log('==> SUCCESSFULLY MIGRATED:', table_successes.join(', '));
	console.error('==> FAILED TO MIGRATE:', table_failures.join(', '));
}

execute_migration();
