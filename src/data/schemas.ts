import { z } from 'zod';

export const register_schema = z.object({
	email: z
		.string({ message: 'Requerido' })
		.email({ message: 'Debe ser un email válido' }),
	names: z
		.string({ message: 'Requerido' })
		.min(3, { message: 'Nombre muy corto' }),
	last_names: z
		.string({ message: 'Requerido' })
		.min(3, { message: 'Apellido muy corto' }),
	password: z
		.string({ message: 'Requerido' })
		.min(5, { message: 'Contraseña muy corta' }),
	role: z.enum(['admin', 'doctor', 'secretary', 'readonly'], {
		message: 'El rol no es válido',
	}),
	phone: z
		.string({ message: 'Requerido' })
		.min(10, { message: 'Mínimo 10 dígitos' })
		.max(14, { message: 'Máximo 14 dígitos' }),
});

export type RegisterSchema = z.infer<typeof register_schema>;

export const apacheScoreObjSchema = z.object({
	age: z.coerce
		.number({ message: 'Este dato es necesario' })
		.min(0, { message: 'Age must be a positive number' }),
	temperature: z.coerce
		.number({ message: 'Este dato es necesario' })
		.min(0, { message: 'Temperature must be a positive number' }),
	blood_pressure: z.coerce
		.number({ message: 'Este dato es necesario' })
		.min(0, { message: 'Blood pressure must be a positive number' }),
	ph: z.coerce
		.number({ message: 'Este dato es necesario' })
		.min(0, { message: 'pH must be a positive number' }),
	heart_rate: z.coerce
		.number({ message: 'Este dato es necesario' })
		.min(0, { message: 'Heart rate must be a positive number' }),
	respiratory_rate: z.coerce
		.number({ message: 'Este dato es necesario' })
		.min(0, { message: 'Respiratory rate must be a positive number' }),
	sodium: z.coerce
		.number({ message: 'Este dato es necesario' })
		.min(0, { message: 'Sodium must be a positive number' }),
	potassium: z.coerce
		.number({ message: 'Este dato es necesario' })
		.min(0, { message: 'Potassium must be a positive number' }),
	creatinine: z.coerce
		.number({ message: 'Este dato es necesario' })
		.min(0, { message: 'Creatinine must be a positive number' }),
});

const create_note_base_schema = z.object({
	user_token: z.string(),
	patient_id: z.number().int(),
	title: z
		.string({ message: 'El título es necesario' })
		.min(3, { message: 'Mínimo 3 caracteres' }),
	description: z
		.string({ message: 'La descripción es necesaria' })
		.min(3, { message: 'Mínimo 3 caracteres' }),
});

const note_without_apache_schema = z.object({
	apache_score: z.literal(false),
	apache_score_obj: z.null(),
});
const note_with_apache_schema = z.object({
	apache_score: z.literal(true),
	apache_score_obj: apacheScoreObjSchema,
});

export const create_followup_note_schema = create_note_base_schema.and(
	z.union([note_without_apache_schema, note_with_apache_schema]),
);
export type CreateFollowupNoteSchema = z.infer<
	typeof create_followup_note_schema
>;

export const register_patient_schema = z.object({
	user_token: z.string(),
	names: z.string(),
	last_names: z.string(),
	age: z.coerce.number().min(0),
	phone: z.coerce.number(),
	admission_date: z.date(),
	mechanical_ventilation: z.boolean(),
	exitus_letalis: z.boolean(),
	discharged: z.boolean(),
});

export type RegisterPatientSchema = z.infer<typeof register_patient_schema>;
