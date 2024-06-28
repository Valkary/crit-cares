import { integer, real, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  email: text('email', { length: 255 }).notNull(),
  names: text('names', { length: 255 }).notNull(),
  last_names: text('last_names', { length: 255 }).notNull(),
  password_hash: text('password_hash', { length: 60 }).notNull(),
  role: text('role', { enum: ['admin', 'doctor', 'secretary', 'readonly'] }).notNull(),
  phone: text('phone').notNull(),
  creation_date: integer('creation_date', { mode: "timestamp" }).notNull(),
});

export const patient_documents = sqliteTable('patient_documents', {
  id: integer('id').primaryKey(),
  patient_id: integer('patient_id').references(() => patients.id).notNull(),
  name: text('name', { length: 255 }).notNull(),
  route: text('route', { length: 510 }).notNull(),
  creation_date: integer('creation_date', { mode: "timestamp" }).$default(() => new Date()),
});

export const patients = sqliteTable('patients', {
  id: integer('id').primaryKey(),
  names: text('names', { length: 255 }).notNull(),
  last_names: text('last_names', { length: 255 }).notNull(),
  age: integer('age').notNull(),
  phone: integer('phone').notNull(),
  admission_date: integer('admission_date', { mode: "timestamp" }).notNull(),
  mechanical_ventilation: integer('mechanical_ventilation', { mode: "boolean" }).$default(() => false),
  exitus_letalis: integer('exitus_letalis', { mode: "boolean" }).$default(() => false),
  doctor_id: integer('doctor_id').references(() => users.id).notNull(),
  discharged: integer('discharged', { mode: "boolean" }).$default(() => false),
  discharge_date: integer('discharge_date', { mode: "timestamp" }),
  creation_date: integer('creation_date', { mode: "timestamp" }).$default(() => new Date()),
});

export const apache_scores = sqliteTable('apache_scores', {
  id: integer('id').primaryKey(),
  patient_id: integer('patient_id').references(() => patients.id).notNull(),
  age: integer('age').notNull(),
  temperature: real('temperature').notNull(),
  blood_pressure: real('blood_pressure').notNull(),
  ph: real('ph').notNull(),
  heart_rate: integer('heart_rate').notNull(),
  respiratory_rate: integer('respiratory_rate').notNull(),
  sodium: real('sodium').notNull(),
  potassium: real('potassium').notNull(),
  creatinine: real('creatinine').notNull(),
  creation_date: integer('creation_date', { mode: "timestamp" }).$default(() => new Date()),
})

export const follow_up_notes = sqliteTable('follow_up_notes', {
  id: integer('id').primaryKey(),
  patient_id: integer('patient_id').references(() => patients.id).notNull(),
  doctor_id: integer('doctor_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  apache_score_id: integer('apache_score_id').references(() => apache_scores.id),
  creation_date: integer('creation_date', { mode: "timestamp" }).$default(() => new Date()),
});
