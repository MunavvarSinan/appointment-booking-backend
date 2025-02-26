CREATE TABLE `appointments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`phone_number` text NOT NULL,
	`date` text NOT NULL,
	`time_slot` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
