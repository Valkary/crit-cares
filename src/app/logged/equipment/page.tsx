'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { get_doctor_patients } from '~/data/patients/get_patients';

export default async function Page() {
	const token = cookies().get('token')?.value;

	if (!token) return redirect('/login?toast=error&msg=Usuario no definido');

	return <></>;
}
