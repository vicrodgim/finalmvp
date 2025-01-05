
-- (Re)create the tables

DROP TABLE IF EXISTS jobs_skills;
DROP TABLE IF EXISTS resources_skills;
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
    `description` VARCHAR(10000) NOT NULL,
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
    `description` VARCHAR(10000) NOT NULL,
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
    `category` VARCHAR(255) NOT NULL
);


CREATE TABLE `skills_users`(
    `user_id` INT UNSIGNED NOT NULL,
    `skill_id` INT UNSIGNED NOT NULL,
    `proficiency_level` VARCHAR(255) NOT NULL
);

-- Used ON CASCADE in both of these entries of the junction table, so that if a user is erased, it's entry on the users_skills table is erased too, and the same with the skill
ALTER TABLE
    `skills_users` ADD CONSTRAINT `skills_users_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;
ALTER TABLE
    `skills_users` ADD CONSTRAINT `skills_users_skill_id_foreign` FOREIGN KEY(`skill_id`) REFERENCES `skills`(`id`) ON DELETE CASCADE;

CREATE TABLE `resources`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `discipline` VARCHAR(255) NOT NULL
);

CREATE TABLE `resources_skills`(
    `resource_id` INT UNSIGNED NOT NULL,
    `skill_id`INT UNSIGNED NOT NULL
);

-- Used ON CASCADE in both of these entries of the junction table, so that if a resource is erased, it's entry on the resources_skills table is erased too, and the same with the skill

ALTER TABLE 
    `resources_skills` ADD CONSTRAINT `resources_skills_resource_id_foreign` FOREIGN KEY (`resource_id`) REFERENCES `resources`(`id`) ON DELETE CASCADE;
ALTER TABLE
    `resources_skills` ADD CONSTRAINT `resources_skills_skill_id_foreign` FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`) ON DELETE CASCADE; 

CREATE TABLE `jobs_skills`(
    `job_id` INT UNSIGNED NOT NULL,
    `skills_id` INT UNSIGNED NOT NULL
);

-- Used ON CASCADE in both of these entries of the junction table, so that if a job is erased, it's entry on the jobs_skills table is erased too, and the same with the skill
ALTER TABLE
    `jobs_skills` ADD CONSTRAINT `jobs_skills_job_id_foreign` FOREIGN KEY(`job_id`) REFERENCES `jobs`(`id`) ON DELETE CASCADE;
ALTER TABLE
    `jobs_skills` ADD CONSTRAINT `jobs_skills_skills_id_foreign` FOREIGN KEY(`skills_id`) REFERENCES `skills`(`id`) ON DELETE CASCADE;

-- Used ON CASCADE here, so that if a user is deleted, a job associated with this user is deleted too
ALTER TABLE
    `jobs` ADD CONSTRAINT `jobs_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;

-- Insert predefined skills

INSERT INTO skills (title, category) VALUES

('HTML', 'frontend'),
('CSS', 'frontend'),
('JavaScript', 'frontend'),
('React', 'frontend'),
('Vue.js', 'frontend'),
('TypeScript', 'frontend'),
('Bootstrap', 'frontend'),
('Node.js', 'backend'),
('Express.js', 'backend'),
('Python', 'backend'),
('Django', 'backend'),
('Java', 'backend'),
('Spring Boot', 'backend'),
('MySQL', 'backend'),
('RESTful APIs', 'fullstack'),
('GraphQL', 'fullstack'),
('Git', 'fullstack'),
('Authentication (OAuth/JWT)', 'fullstack'),
('Microservices', 'fullstack'),
('Testing (e.g., Jest/Mocha)', 'fullstack'),
('Docker', 'fullstack');


-- Insert predefined resources 

INSERT INTO resources (title, url, type, discipline) VALUES
('HTML, CSS, JavaScript, React, and Node.js from Zero to Expert', 'https://www.udemy.com/course/html-css-javascript-reactjs-nodejs-from-zero-to-expert/', 'course', 'frontend'),
('HTML Tutorial by W3Schools', 'https://www.w3schools.com/html/', 'tutorial', 'frontend'),
('Design and Develop a Killer Website with HTML5 and CSS3', 'https://www.udemy.com/course/design-and-develop-a-killer-website-with-html5-and-css3/', 'course', 'frontend'),
('CSS Documentation by MDN', 'https://developer.mozilla.org/en-US/docs/Web/CSS', 'tutorial', 'frontend'),
('The Complete JavaScript Course', 'https://www.udemy.com/course/the-complete-javascript-course/', 'course', 'frontend'),
('Eloquent JavaScript Book', 'https://eloquentjavascript.net/', 'book', 'frontend'),
('React for Beginners: From HTML, CSS, JavaScript to ReactJS', 'https://www.udemy.com/course/react-for-beginners-from-html-css-javascript-to-reactjs/', 'course', 'frontend'),
('React Tutorial by ReactJS.org', 'https://reactjs.org/tutorial/tutorial.html', 'tutorial', 'frontend'),
('Vue.js 2: The Complete Guide', 'https://www.udemy.com/course/vuejs-2-the-complete-guide/', 'course', 'frontend'),
('Vue.js Introduction Guide', 'https://vuejs.org/guide/introduction.html', 'tutorial', 'frontend'),
('Understanding TypeScript', 'https://www.udemy.com/course/understanding-typescript/', 'course', 'frontend'),
('TypeScript Documentation', 'https://www.typescriptlang.org/docs/', 'tutorial', 'frontend'),
('Bootstrap 4 from Scratch with 5 Projects', 'https://www.udemy.com/course/bootstrap-4-from-scratch-with-5-projects/', 'course', 'frontend'),
('Bootstrap 4 Documentation', 'https://getbootstrap.com/docs/4.0/getting-started/introduction/', 'tutorial', 'frontend'),
('HTML, CSS, JavaScript, React, and Node.js from Zero to Expert', 'https://www.udemy.com/course/html-css-javascript-reactjs-nodejs-from-zero-to-expert/', 'course', 'backend'),
('Node.js Design Patterns Book', 'https://www.nodejsdesignpatterns.com/', 'book', 'backend'),
('The Complete Node.js Developer Course', 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/', 'course', 'backend'),
('Express in Action Book', 'https://www.manning.com/books/express-in-action', 'book', 'backend'),
('Python Specialization by Coursera', 'https://www.coursera.org/specializations/python', 'course', 'backend'),
('Automate the Boring Stuff with Python', 'https://automatetheboringstuff.com/', 'book', 'backend'),
('Django for Everybody Specialization', 'https://www.coursera.org/specializations/django-for-everybody', 'course', 'backend'),
('Django for Beginners Book', 'https://djangoforbeginners.com/', 'book', 'backend'),
('Java Programming Specialization', 'https://www.coursera.org/specializations/java-programming', 'course', 'backend'),
('Effective Java, 3rd Edition', 'https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/', 'book', 'backend'),
('Spring & Hibernate Tutorial', 'https://www.udemy.com/course/spring-hibernate-tutorial/', 'course', 'backend'),
('Spring Boot in Action Book', 'https://www.manning.com/books/spring-boot-in-action', 'book', 'backend'),
('MySQL Database Development Masterclass', 'https://www.udemy.com/course/mysql-database-development-masterclass/', 'course', 'backend'),
('MySQL Official Documentation', 'https://dev.mysql.com/doc/', 'tutorial', 'backend'),
('Designing RESTful APIs', 'https://www.udemy.com/course/designing-restful-apis/', 'course', 'fullstack'),
('RESTful API Guide', 'https://restfulapi.net/', 'tutorial', 'fullstack'),
('GraphQL with React Course', 'https://www.udemy.com/course/graphql-with-react-course/', 'course', 'fullstack'),
('GraphQL Official Documentation', 'https://graphql.org/learn/', 'tutorial', 'fullstack'),
('Git Complete Course', 'https://www.udemy.com/course/git-complete/', 'course', 'fullstack'),
('Git Official Documentation', 'https://git-scm.com/doc', 'tutorial', 'fullstack'),
('OAuth 2.0 and JWT: The Complete Guide', 'https://www.udemy.com/course/oauth-2-jwt-the-complete-guide/', 'course', 'fullstack'),
('JWT Introduction', 'https://jwt.io/introduction/', 'tutorial', 'fullstack'),
('Microservices with Node.js and React', 'https://www.udemy.com/course/microservices-with-node-js-and-react/', 'course', 'fullstack'),
('Microservices Architecture by Martin Fowler', 'https://martinfowler.com/articles/microservices.html', 'tutorial', 'fullstack'),
('Testing JavaScript with Jest', 'https://www.udemy.com/course/testing-javascript-with-jest/', 'course', 'fullstack'),
('Jest Documentation', 'https://jestjs.io/docs/getting-started', 'tutorial', 'fullstack'),
('Docker Mastery', 'https://www.udemy.com/course/docker-mastery/', 'course', 'fullstack'),
('Docker Getting Started Guide', 'https://docs.docker.com/get-started/', 'tutorial', 'fullstack');

-- Insert resources-skills relatioship
INSERT INTO resources_skills (resource_id, skill_id) VALUES

-- Resource 1: HTML, CSS, JavaScript, React, and Node.js
(1, 1), -- HTML
(1, 2), -- CSS
(1, 3), -- JavaScript
(1, 4), -- React
(1, 8), -- Node.js

-- Resource 2: HTML
(2, 1), -- HTML

-- Resource 3: HTML and CSS
(3, 1), -- HTML
(3, 2), -- CSS

-- Resource 4: CSS
(4, 2), -- CSS

-- Resources 5 and 6: JavaScript
(5, 3), -- JavaScript
(6, 3), -- JavaScript

-- Resource 7: HTML, CSS, JavaScript, React
(7, 1), -- HTML
(7, 2), -- CSS
(7, 3), -- JavaScript
(7, 4), -- React

-- Resource 8: React
(8, 4),

-- Resources 9 and 10: Vue.js
(9, 5),
(10, 5),

-- Resources 11 and 12: TypeScript
(11, 6),
(12, 6),

-- Resource 13 and 14: Bootstrap
(13, 7),
(14, 7),

-- Resource 15 and 16, 17: Node.js
(15, 8),
(15, 1),
(15, 2),
(15, 3),
(15, 4),
(16, 8),
(17, 8),

-- Resource 18: Express
(18, 9),

-- Resources 19 and 20: Python
(19, 10),
(20, 10),

-- Resource 21 and 22: Django 
(21, 11), 
(22, 11),

-- Resource 23 and 24: Java 
(23, 12), 
(24, 12), 

-- Resource 25 and 26: Spring Boot
(25, 13), 
(26, 13), 

-- Resource 27 and 28: MySQL
(27, 14), 
(28, 14),

-- Resource 29 and 30: RESTful APIs
(29, 15), 
(30, 15), 

-- Resource 31 and 32: GraphQL 
(31, 16), 
(32, 16), 

-- Resource 33 and 34: Git 
(33, 17),
(34, 17), 

-- Resource 35 and 36: Authentication (OAuth/JWT)
(35, 18),
(36, 18), 

-- Resource 37 AND 38: Microservices
(37, 19),
(38, 19),

-- Resources 39 and 40: Testing JavaScript with Jest
(39, 3),
(39, 20),
(40, 20), 

-- Resource 41 and 42: Docker 
(41, 21),
(42, 21);
