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
	`widgetId` text NOT NULL,
	`propertyTemplateId` text NOT NULL,
	`data` blob,
	FOREIGN KEY (`widgetId`) REFERENCES `widget`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`propertyTemplateId`) REFERENCES `propertyTemplate`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `propertyTemplate` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text,
	`description` text,
	`widgetTemplateId` text NOT NULL,
	`dataTypeId` text NOT NULL,
	`default` blob,
	FOREIGN KEY (`widgetTemplateId`) REFERENCES `widgetTemplate`(`id`) ON UPDATE no action ON DELETE no action,
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
	`controllerId` text,
	`dataTypeId` text NOT NULL,
	`value` text,
	FOREIGN KEY (`controllerId`) REFERENCES `controller`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`dataTypeId`) REFERENCES `dataType`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `widget` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text,
	`description` text,
	`widgetTemplateId` text NOT NULL,
	`screenId` text NOT NULL,
	`xPos` real DEFAULT 0,
	`yPos` real DEFAULT 0,
	`xScale` real DEFAULT 0,
	`yScale` real DEFAULT 0,
	`rotation` real DEFAULT 0,
	FOREIGN KEY (`widgetTemplateId`) REFERENCES `widgetTemplate`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`screenId`) REFERENCES `screen`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `widgetTemplate` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `widgetsTags` (
	`widgetId` text NOT NULL,
	`tagId` text NOT NULL,
	PRIMARY KEY(`widgetId`, `tagId`),
	FOREIGN KEY (`widgetId`) REFERENCES `widget`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON UPDATE no action ON DELETE no action
);
