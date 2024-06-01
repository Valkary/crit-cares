CREATE TABLE `apache_scores` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`patient_id` bigint unsigned NOT NULL,
	`creation_date` date NOT NULL,
	CONSTRAINT `apache_scores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `doctors` (
	`id` serial AUTO_INCREMENT NOT NULL,
	CONSTRAINT `doctors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `follow_up_notes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`patient_id` bigint unsigned NOT NULL,
	`doctor_id` bigint unsigned NOT NULL,
	`description` text,
	`apache_score_id` bigint unsigned,
	`creation_date` date NOT NULL,
	CONSTRAINT `follow_up_notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `patient_documents` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`patient_id` bigint unsigned NOT NULL,
	`names` varchar(510) NOT NULL,
	`creation_date` date NOT NULL,
	CONSTRAINT `patient_documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `patients` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`names` varchar(255) NOT NULL,
	`last_names` varchar(255) NOT NULL,
	`age` int NOT NULL,
	`phone` int NOT NULL,
	`admission_date` date NOT NULL,
	`mechanical_ventilation` boolean NOT NULL,
	`exitus_letalis` boolean NOT NULL,
	`doctor_id` bigint unsigned,
	`discharged` boolean NOT NULL,
	`discharge_date` date,
	`creation_date` date NOT NULL,
	CONSTRAINT `patients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`names` varchar(255) NOT NULL,
	`last_names` varchar(255) NOT NULL,
	`password_hash` varchar(60) NOT NULL,
	`role` enum('admin','doctor','secretary','readonly') NOT NULL,
	`phone` int NOT NULL,
	`creation_date` date NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `apache_scores` ADD CONSTRAINT `apache_scores_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `follow_up_notes` ADD CONSTRAINT `follow_up_notes_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `follow_up_notes` ADD CONSTRAINT `follow_up_notes_doctor_id_doctors_id_fk` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `follow_up_notes` ADD CONSTRAINT `follow_up_notes_apache_score_id_apache_scores_id_fk` FOREIGN KEY (`apache_score_id`) REFERENCES `apache_scores`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `patient_documents` ADD CONSTRAINT `patient_documents_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `patients` ADD CONSTRAINT `patients_doctor_id_doctors_id_fk` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE no action ON UPDATE no action;