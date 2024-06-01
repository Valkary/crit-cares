import { bigint, boolean, date, float, int, mysqlEnum, mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable('users', {
    id: serial('id').primaryKey(),
    names: varchar('names', { length: 255 }).notNull(),
    last_names: varchar('last_names', { length: 255 }).notNull(),
    password_hash: varchar('password_hash', { length: 60 }).notNull(),
    role: mysqlEnum('role', ['admin', 'doctor', 'secretary', 'readonly']).notNull(),
    phone: int('phone').notNull(),
    creation_date: date('creation_date').notNull(),
});

export const doctors = mysqlTable('doctors', {
    id: serial('id').primaryKey(),
    // TODO: more relevant information about the doctors
});

export const patient_documents = mysqlTable('patient_documents', {
    id: serial('id').primaryKey(),
    patient_id: bigint('patient_id', { mode: 'number', unsigned: true }).references(() => patients.id).notNull(),
    name: varchar('names', { length: 255 }).notNull(),
    creation_date: date('creation_date').notNull(),
    route: varchar('names', { length: 510 }).notNull(),
});

export const patients = mysqlTable('patients', {
    id: serial('id').primaryKey(),
    names: varchar('names', { length: 255 }).notNull(),
    last_names: varchar('last_names', { length: 255 }).notNull(),
    age: int('age').notNull(),
    phone: int('phone').notNull(),
    admission_date: date('admission_date').notNull(),
    mechanical_ventilation: boolean('mechanical_ventilation').$default(() => false).notNull(),
    exitus_letalis: boolean('exitus_letalis').$default(() => false).notNull(),
    doctor_id: bigint('doctor_id', { mode: 'number', unsigned: true }).references(() => doctors.id),
    discharged: boolean('discharged').$default(() => false).notNull(),
    discharge_date: date('discharge_date'),
    creation_date: date('creation_date').notNull(),
});

export const apache_scores = mysqlTable('apache_scores', {
    id: serial('id').primaryKey(),
    patient_id: bigint('patient_id', { mode: 'number', unsigned: true }).references(() => patients.id).notNull(),
    // TODO: all relevant information to the apache score
    creation_date: date('creation_date').notNull(),
})

export const follow_up_notes = mysqlTable('follow_up_notes', {
    id: serial('id').primaryKey(),
    patient_id: bigint('patient_id', { mode: 'number', unsigned: true }).references(() => patients.id).notNull(),
    doctor_id: bigint('doctor_id', { mode: 'number', unsigned: true }).references(() => doctors.id).notNull(),
    description: text('description'),
    apache_score_id: bigint('apache_score_id', { mode: 'number', unsigned: true }).references(() => apache_scores.id),
    creation_date: date('creation_date').notNull(),
});
