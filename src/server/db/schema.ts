import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user_roles = sqliteTable('user_roles', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	read: integer('read', { mode: 'boolean' })
		.notNull()
		.$default(() => false),
	write: integer('write', { mode: 'boolean' })
		.notNull()
		.$default(() => false),
	delete: integer('delete', { mode: 'boolean' })
		.notNull()
		.$default(() => false),
	update: integer('update', { mode: 'boolean' })
		.notNull()
		.$default(() => false),
});

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	email: text('email', { length: 256 }).notNull(),
	names: text('names', { length: 256 }).notNull(),
	last_names: text('last_names', { length: 256 }).notNull(),
	password_hash: text('password_hash', { length: 60 }).notNull(),
	role_id: integer('role_id')
		.references(() => user_roles.id)
		.notNull(),
	phone: text('phone').notNull(),
	creation_date: integer('creation_date', { mode: 'timestamp' })
		.notNull()
		.$default(() => new Date()),
});

export const doctors = sqliteTable('doctors', {
	id: integer('id').primaryKey(),
	specialty: text('specialty').notNull(),
	identity_card: integer('identity_card').notNull(),
	creation_date: integer('creation_date', { mode: 'timestamp' })
		.notNull()
		.$default(() => new Date()),
});

export const patient_documents = sqliteTable('patient_documents', {
	id: integer('id').primaryKey(),
	patient_id: integer('patient_id')
		.references(() => patients.id)
		.notNull(),
	name: text('name', { length: 256 }).notNull(),
	route: text('route', { length: 1024 }).notNull(),
	creation_date: integer('creation_date', { mode: 'timestamp' })
		.notNull()
		.$default(() => new Date()),
	creator_id: integer('creator_id')
		.references(() => users.id)
		.notNull(),
});

export const patients = sqliteTable('patients', {
	id: integer('id').primaryKey(),
	names: text('names', { length: 256 }).notNull(),
	last_names: text('last_names', { length: 256 }).notNull(),
	age: integer('age').notNull(),
	phone: integer('phone').notNull(),
	creation_date: integer('creation_date', { mode: 'timestamp' })
		.notNull()
		.$default(() => new Date()),
	creator_id: integer('creator_id').references(() => users.id),
});

export const treatments = sqliteTable('treatments', {
	id: integer('id').primaryKey(),
	patient_id: integer('patient_id')
		.references(() => patients.id)
		.notNull(),
	creation_date: integer('creation_date', { mode: 'timestamp' })
		.notNull()
		.$default(() => new Date()),
	creator_id: integer('creator_id').references(() => users.id),
});

export const admissions = sqliteTable('admissions', {
	id: integer('id').primaryKey(),
	event_id: integer('event_id')
		.references(() => treatments.id)
		.notNull(),
	doctor_id: integer('doctor_id')
		.references(() => users.id)
		.notNull(),
	reason: text('motive').notNull(),
	record: text('record').notNull(),
	usual_treatment: text('usual_treatment').notNull(),
	current_ailment: text('current_ailment').notNull(),
	physical_exploration: text('physical_exploration').notNull(),
	complementary_exams: text('complementary_exams').notNull(),
	diagnostics: text('diagnostics').notNull(),
	prognosis: text('prognosis').notNull(),
	apache_score_id: integer('apache_score_id')
		.references(() => apache_scores.id)
		.notNull(),
	date: integer('date', { mode: 'timestamp' }).notNull(),
	mechanical_ventilation: integer('mechanical_ventilation', {
		mode: 'boolean',
	})
		.$default(() => false)
		.notNull(),
	creation_date: integer('creation_date', { mode: 'timestamp' })
		.notNull()
		.$default(() => new Date()),
	creator_id: integer('creator_id').references(() => users.id),
});

export const discharges = sqliteTable('discharges', {
	id: integer('id').primaryKey(),
	event_id: integer('event_id')
		.references(() => treatments.id)
		.notNull(),
	doctor_id: integer('doctor_id')
		.references(() => users.id)
		.notNull(),
	reason: text('motive').notNull(),
	clinical_report: text('clinical_report').notNull(),
	date: integer('date', { mode: 'timestamp' }).notNull(),
	creation_date: integer('creation_date', { mode: 'timestamp' })
		.notNull()
		.$default(() => new Date()),
	creator_id: integer('creator_id').references(() => users.id),
});

export const followup_notes = sqliteTable('followup_notes', {
	id: integer('id').primaryKey(),
	event_id: integer('event_id')
		.references(() => treatments.id)
		.notNull(),
	doctor_id: integer('doctor_id')
		.references(() => users.id)
		.notNull(),
	title: text('title').notNull(),
	description: text('description'),
	apache_score_id: integer('apache_score_id').references(
		() => apache_scores.id,
	),
	creation_date: integer('creation_date', { mode: 'timestamp' })
		.notNull()
		.$default(() => new Date()),
	creator_id: integer('creator_id').references(() => users.id),
});

export const apache_scores = sqliteTable('apache_scores', {
	id: integer('id').primaryKey(),
	patient_id: integer('patient_id')
		.references(() => patients.id)
		.notNull(),
	age: integer('age').notNull(),
	temperature: real('temperature').notNull(),
	blood_pressure: real('blood_pressure').notNull(),
	ph: real('ph').notNull(),
	heart_rate: integer('heart_rate').notNull(),
	respiratory_rate: integer('respiratory_rate').notNull(),
	sodium: real('sodium').notNull(),
	potassium: real('potassium').notNull(),
	creatinine: real('creatinine').notNull(),
	creation_date: integer('creation_date', { mode: 'timestamp' })
		.notNull()
		.$default(() => new Date()),
	creator_id: integer('creator_id').references(() => users.id),
});
