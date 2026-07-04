CREATE TABLE `notificationPreferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`emailNotifications` enum('true','false') NOT NULL DEFAULT 'true',
	`smsNotifications` enum('true','false') NOT NULL DEFAULT 'true',
	`inAppNotifications` enum('true','false') NOT NULL DEFAULT 'true',
	`paymentReminders` enum('true','false') NOT NULL DEFAULT 'true',
	`overdueAlerts` enum('true','false') NOT NULL DEFAULT 'true',
	`propertyUpdates` enum('true','false') NOT NULL DEFAULT 'true',
	`tenantUpdates` enum('true','false') NOT NULL DEFAULT 'true',
	`weeklyReports` enum('true','false') NOT NULL DEFAULT 'false',
	`phoneNumber` varchar(20),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notificationPreferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `notificationPreferences_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('success','error','warning','info') NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`actionUrl` varchar(500),
	`actionLabel` varchar(100),
	`isRead` enum('true','false') NOT NULL DEFAULT 'false',
	`channels` varchar(255) NOT NULL DEFAULT 'in-app',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`expiresAt` timestamp,
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
