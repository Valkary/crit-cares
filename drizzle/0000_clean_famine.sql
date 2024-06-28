CREATE TABLE `apache_scores` (
	`id` integer PRIMARY KEY NOT NULL,
	`patient_id` integer NOT NULL,
	`age` integer NOT NULL,
	`temperature` real NOT NULL,
	`blood_pressure` real NOT NULL,
	`ph` real NOT NULL,
	`heart_rate` integer NOT NULL,
	`respiratory_rate` integer NOT NULL,
	`sodium` real NOT NULL,
	`potassium` real NOT NULL,
	`creatinine` real NOT NULL,
	`creation_date` integer,
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `follow_up_notes` (
	`id` integer PRIMARY KEY NOT NULL,
	`patient_id` integer NOT NULL,
	`doctor_id` integer NOT NULL,
	`title` text,
	`description` text,
	`apache_score_id` integer,
	`creation_date` integer,
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`doctor_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`apache_score_id`) REFERENCES `apache_scores`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `patient_documents` (
	`id` integer PRIMARY KEY NOT NULL,
	`patient_id` integer NOT NULL,
	`name` text(255) NOT NULL,
	`route` text(510) NOT NULL,
	`creation_date` integer,
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `patients` (
	`id` integer PRIMARY KEY NOT NULL,
	`names` text(255) NOT NULL,
	`last_names` text(255) NOT NULL,
	`age` integer NOT NULL,
	`phone` integer NOT NULL,
	`admission_date` integer NOT NULL,
	`mechanical_ventilation` integer,
	`exitus_letalis` integer,
	`doctor_id` integer NOT NULL,
	`discharged` integer,
	`discharge_date` integer,
	`creation_date` integer,
	FOREIGN KEY (`doctor_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text(255) NOT NULL,
	`names` text(255) NOT NULL,
	`last_names` text(255) NOT NULL,
	`password_hash` text(60) NOT NULL,
	`role` text NOT NULL,
	`phone` text NOT NULL,
	`creation_date` integer NOT NULL
);
