CREATE TABLE `component` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text,
	`description` text,
	`componentTemplateId` text NOT NULL,
	`screenId` text NOT NULL,
	`xPos` real DEFAULT 0,
	`yPos` real DEFAULT 0,
	`xScale` real DEFAULT 0,
	`yScale` real DEFAULT 0,
	`rotation` real DEFAULT 0,
	FOREIGN KEY (`componentTemplateId`) REFERENCES `componentTemplate`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`screenId`) REFERENCES `screen`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `componentsTags` (
	`componentId` text NOT NULL,
	`tagId` text NOT NULL,
	PRIMARY KEY(`componentId`, `tagId`),
	FOREIGN KEY (`componentId`) REFERENCES `component`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `componentTemplate` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `controller` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text,
	`description` text,
	`type` text,
	`ip` text,
	`slot` integer DEFAULT 0 NOT NULL,
	`rpi` integer DEFAULT 50 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `controller_ip_unique` ON `controller` (`ip`);--> statement-breakpoint
CREATE TABLE `dataType` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text,
	`description` text,
	`typescriptType` text
);
--> statement-breakpoint
CREATE INDEX `nameIndex` ON `dataType` (`name`);--> statement-breakpoint
CREATE TABLE `property` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`componentId` text NOT NULL,
	`propertyTemplateId` text NOT NULL,
	`data` blob,
	FOREIGN KEY (`componentId`) REFERENCES `component`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`propertyTemplateId`) REFERENCES `propertyTemplate`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `propertyTemplate` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text,
	`description` text,
	`componentTemplateId` text NOT NULL,
	`dataTypeId` text NOT NULL,
	`default` blob,
	FOREIGN KEY (`componentTemplateId`) REFERENCES `componentTemplate`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`dataTypeId`) REFERENCES `dataType`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `screen` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`controller.id` text,
	`dataTypeId` text NOT NULL,
	`value` text,
	FOREIGN KEY (`controller.id`) REFERENCES `controller`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`dataTypeId`) REFERENCES `dataType`(`id`) ON UPDATE no action ON DELETE no action
);
