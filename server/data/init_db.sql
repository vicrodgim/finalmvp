
-- (Re)create the tables

DROP TABLE IF EXISTS jobs_skills;
DROP TABLE IF EXISTS resources; 
DROP TABLE IF EXISTS skills_users; 
DROP TABLE IF EXISTS skills; 
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS users;



CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `imageUrl` VARCHAR(255) NOT NULL
);
CREATE TABLE `jobs`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `company_name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `location_type` VARCHAR(255) NULL,
    `description` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `date_range` DATETIME NULL,
    `min_salary` INT NULL,
    `max_salary` INT NULL,
    `has_applied` BOOLEAN NOT NULL,
    `created_at` DATE NULL,
    `url` VARCHAR(255) NOT NULL
);
CREATE TABLE `skills`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `flag` VARCHAR(255) NOT NULL
);
CREATE TABLE `skills_users`(
    `user_id` INT UNSIGNED NOT NULL,
    `skill_id` INT UNSIGNED NOT NULL,
    `proficiency_level` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `skills_users` ADD CONSTRAINT `skills_users_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `skills_users` ADD CONSTRAINT `skills_users_skill_id_foreign` FOREIGN KEY(`skill_id`) REFERENCES `skills`(`id`);

CREATE TABLE `resources`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `url` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `skill_id` INT UNSIGNED NOT NULL
);

ALTER TABLE
    `resources` ADD CONSTRAINT `resources_skill_id_foreign` FOREIGN KEY(`skill_id`) REFERENCES `skills`(`id`);

CREATE TABLE `jobs_skills`(
    `job_id` INT UNSIGNED NOT NULL,
    `skills_id` INT UNSIGNED NOT NULL
);

ALTER TABLE
    `jobs_skills` ADD CONSTRAINT `jobs_skills_job_id_foreign` FOREIGN KEY(`job_id`) REFERENCES `jobs`(`id`);
ALTER TABLE
    `jobs_skills` ADD CONSTRAINT `jobs_skills_skills_id_foreign` FOREIGN KEY(`skills_id`) REFERENCES `skills`(`id`);

ALTER TABLE
    `jobs` ADD CONSTRAINT `jobs_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
