CREATE TABLE `component_types` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `components` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`component_type_id` text NOT NULL,
	`x_pos` real DEFAULT 0,
	`y_pos` real DEFAULT 0,
	`x_scale` real DEFAULT 0,
	`y_scale` real DEFAULT 0,
	`rotation` real DEFAULT 0,
	FOREIGN KEY (`component_type_id`) REFERENCES `component_types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `components_tags` (
	`component_id` text NOT NULL,
	`tag_id` text NOT NULL,
	FOREIGN KEY (`component_id`,`tag_id`) REFERENCES `components`(`id`,`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `controllers` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`type` text NOT NULL,
	`ip` text,
	`slot` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `controllers_ip_unique` ON `controllers` (`ip`);--> statement-breakpoint
CREATE TABLE `screens` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`controller.id` text,
	`data_type` text,
	`value` text,
	FOREIGN KEY (`controller.id`) REFERENCES `controllers`(`id`) ON UPDATE no action ON DELETE no action
);
