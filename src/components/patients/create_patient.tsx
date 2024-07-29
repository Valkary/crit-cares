'use client';
import { Ban, Check, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
	type FormEvent,
	type ReactNode,
	useReducer,
	useRef,
	useState,
} from 'react';
import { useAuth } from '~/context/auth';
import { registerPatient } from '~/data/patients/register';

type CreatePatientForm = {
	names: string;
	last_names: string;
	age: number;
	phone: number;
	admission_date: Date;
	mechanical_ventilation: boolean;
	exitus_letalis: boolean;
	discharged: boolean;
};

type CreateStates = 'idle' | 'loading' | 'error' | 'success';

const create_patient_form: CreatePatientForm = {
	names: '',
	last_names: '',
	age: 0,
	phone: 0,
	admission_date: new Date(),
	mechanical_ventilation: false,
	exitus_letalis: false,
	discharged: false,
};

const button_states: Record<CreateStates, ReactNode> = {
	idle: (
		<button
			type="submit"
			className="btn btn-primary w-full py-2 px-4 rounded-md"
		>
			<span>Crear paciente</span>
		</button>
	),
	loading: (
		<button
			type="submit"
			className="btn btn-primary w-full py-2 px-4 rounded-md"
			disabled
		>
			<span className="loading loading-dots loading-lg" />
		</button>
	),
	error: (
		<button type="submit" className="btn btn-error w-full py-2 px-4 rounded-md">
			<Ban />
			<span>Error creando paciente</span>
		</button>
	),
	success: (
		<button
			type="submit"
			className="btn btn-success w-full py-2 px-4 rounded-md"
			disabled
		>
			<Check />
			<span>Paciente creado</span>
		</button>
	),
};

function reducer(
	state: CreatePatientForm,
	action: Partial<CreatePatientForm>,
): CreatePatientForm {
	return {
		...state,
		...action,
	};
}

export default function CreatePatient() {
	const { user } = useAuth();
	const router = useRouter();
	const [formState, setFormState] = useReducer(reducer, create_patient_form);
	const [createState, setCreateState] = useState<CreateStates>('idle');

	async function submitForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setCreateState('loading');

		if (user) {
			const create_patient_req = await registerPatient({
				...formState,
				user_token: user.token,
			});

			if (create_patient_req.success) {
				router.refresh();
				return setCreateState('success');
			}

			return setCreateState('error');
		}
	}

	return (
		<>
			<h3 className="font-bold text-lg">Crear paciente</h3>
			<form
				method="post"
				className="mt-4 flex flex-col mb-4 gap-5"
				onSubmit={(e) => submitForm(e)}
			>
				<label className="input input-bordered flex items-center gap-2">
					Nombres
					<input
						type="text"
						name="names"
						className="grow"
						placeholder="correo electrónico"
						value={formState.names}
						onChange={(e) => setFormState({ names: e.currentTarget.value })}
						required
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Appellidos
					<input
						type="text"
						name="last_names"
						className="grow"
						placeholder="correo electrónico"
						value={formState.last_names}
						onChange={(e) =>
							setFormState({ last_names: e.currentTarget.value })
						}
						required
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Edad
					<input
						type="number"
						step={1}
						min={0}
						name="names"
						value={formState.age}
						onChange={(e) =>
							setFormState({ age: Number.parseInt(e.currentTarget.value) })
						}
						required
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Télefono
					<input
						type="tel"
						name="names"
						value={formState.phone}
						onChange={(e) =>
							setFormState({ phone: Number.parseInt(e.currentTarget.value) })
						}
						required
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Admisión
					<input
						type="date"
						name="admission_date"
						onChange={(e) =>
							setFormState({ admission_date: new Date(e.currentTarget.value) })
						}
						required
					/>
				</label>
				<div className="flex flex-col">
					<div className="form-control w-52">
						<label className="label cursor-pointer">
							<span className="label-text">Ventilación mecánica</span>
							<input
								type="checkbox"
								className="toggle toggle-primary"
								checked={formState.mechanical_ventilation}
								onChange={(_) =>
									setFormState({
										mechanical_ventilation: !formState.mechanical_ventilation,
									})
								}
							/>
						</label>
					</div>
					<div className="form-control w-52">
						<label className="label cursor-pointer">
							<span className="label-text">Exitus letalis</span>
							<input
								type="checkbox"
								className="toggle toggle-primary"
								checked={formState.exitus_letalis}
								onChange={(_) =>
									setFormState({ exitus_letalis: !formState.exitus_letalis })
								}
							/>
						</label>
					</div>
					<div className="form-control w-52">
						<label className="label cursor-pointer">
							<span className="label-text">Alta médica</span>
							<input
								type="checkbox"
								className="toggle toggle-primary"
								checked={formState.discharged}
								onChange={(_) =>
									setFormState({ discharged: !formState.discharged })
								}
							/>
						</label>
					</div>
				</div>
				{button_states[createState]}
			</form>
		</>
	);
}
