
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
    `discipline` VARCHAR(255) NOT NULL,
    `skill_id` INT UNSIGNED NOT NULL
);

ALTER TABLE
    `resources` ADD CONSTRAINT `resources_skill_id_foreign` FOREIGN KEY(`skill_id`) REFERENCES `skills`(`id`);

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

INSERT INTO resources (title, url, type, discipline, skill_id) VALUES
('HTML, CSS, JavaScript, React, and Node.js from Zero to Expert', 'https://www.udemy.com/course/html-css-javascript-reactjs-nodejs-from-zero-to-expert/', 'course', 'frontend', 1),
('HTML Tutorial by W3Schools', 'https://www.w3schools.com/html/', 'tutorial', 'frontend', 1),
('Design and Develop a Killer Website with HTML5 and CSS3', 'https://www.udemy.com/course/design-and-develop-a-killer-website-with-html5-and-css3/', 'course', 'frontend', 2),
('CSS Documentation by MDN', 'https://developer.mozilla.org/en-US/docs/Web/CSS', 'tutorial', 'frontend', 2),
('The Complete JavaScript Course', 'https://www.udemy.com/course/the-complete-javascript-course/', 'course', 'frontend', 3),
('Eloquent JavaScript Book', 'https://eloquentjavascript.net/', 'book', 'frontend', 3),
('React for Beginners: From HTML, CSS, JavaScript to ReactJS', 'https://www.udemy.com/course/react-for-beginners-from-html-css-javascript-to-reactjs/', 'course', 'frontend', 4),
('React Tutorial by ReactJS.org', 'https://reactjs.org/tutorial/tutorial.html', 'tutorial', 'frontend', 4),
('Vue.js 2: The Complete Guide', 'https://www.udemy.com/course/vuejs-2-the-complete-guide/', 'course', 'frontend', 5),
('Vue.js Introduction Guide', 'https://vuejs.org/guide/introduction.html', 'tutorial', 'frontend', 5),
('Understanding TypeScript', 'https://www.udemy.com/course/understanding-typescript/', 'course', 'frontend', 6),
('TypeScript Documentation', 'https://www.typescriptlang.org/docs/', 'tutorial', 'frontend', 6),
('Bootstrap 4 from Scratch with 5 Projects', 'https://www.udemy.com/course/bootstrap-4-from-scratch-with-5-projects/', 'course', 'frontend', 7),
('Bootstrap 4 Documentation', 'https://getbootstrap.com/docs/4.0/getting-started/introduction/', 'tutorial', 'frontend', 7),
('HTML, CSS, JavaScript, React, and Node.js from Zero to Expert', 'https://www.udemy.com/course/html-css-javascript-reactjs-nodejs-from-zero-to-expert/', 'course', 'backend', 8),
('Node.js Design Patterns Book', 'https://www.nodejsdesignpatterns.com/', 'book', 'backend', 8),
('The Complete Node.js Developer Course', 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/', 'course', 'backend', 9),
('Express in Action Book', 'https://www.manning.com/books/express-in-action', 'book', 'backend', 9),
('Python Specialization by Coursera', 'https://www.coursera.org/specializations/python', 'course', 'backend', 10),
('Automate the Boring Stuff with Python', 'https://automatetheboringstuff.com/', 'book', 'backend', 10),
('Django for Everybody Specialization', 'https://www.coursera.org/specializations/django-for-everybody', 'course', 'backend', 11),
('Django for Beginners Book', 'https://djangoforbeginners.com/', 'book', 'backend', 11),
('Java Programming Specialization', 'https://www.coursera.org/specializations/java-programming', 'course', 'backend', 12),
('Effective Java, 3rd Edition', 'https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/', 'book', 'backend', 12),
('Spring & Hibernate Tutorial', 'https://www.udemy.com/course/spring-hibernate-tutorial/', 'course', 'backend', 13),
('Spring Boot in Action Book', 'https://www.manning.com/books/spring-boot-in-action', 'book', 'backend', 13),
('MySQL Database Development Masterclass', 'https://www.udemy.com/course/mysql-database-development-masterclass/', 'course', 'backend', 14),
('MySQL Official Documentation', 'https://dev.mysql.com/doc/', 'tutorial', 'backend', 14),
('Designing RESTful APIs', 'https://www.udemy.com/course/designing-restful-apis/', 'course', 'fullstack', 15),
('RESTful API Guide', 'https://restfulapi.net/', 'tutorial', 'fullstack', 15),
('GraphQL with React Course', 'https://www.udemy.com/course/graphql-with-react-course/', 'course', 'fullstack', 16),
('GraphQL Official Documentation', 'https://graphql.org/learn/', 'tutorial', 'fullstack', 16),
('Git Complete Course', 'https://www.udemy.com/course/git-complete/', 'course', 'fullstack', 17),
('Git Official Documentation', 'https://git-scm.com/doc', 'tutorial', 'fullstack', 17),
('OAuth 2.0 and JWT: The Complete Guide', 'https://www.udemy.com/course/oauth-2-jwt-the-complete-guide/', 'course', 'fullstack', 18),
('JWT Introduction', 'https://jwt.io/introduction/', 'tutorial', 'fullstack', 18),
('Microservices with Node.js and React', 'https://www.udemy.com/course/microservices-with-node-js-and-react/', 'course', 'fullstack', 19),
('Microservices Architecture by Martin Fowler', 'https://martinfowler.com/articles/microservices.html', 'tutorial', 'fullstack', 19),
('Testing JavaScript with Jest', 'https://www.udemy.com/course/testing-javascript-with-jest/', 'course', 'fullstack', 20),
('Jest Documentation', 'https://jestjs.io/docs/getting-started', 'tutorial', 'fullstack', 20),
('Docker Mastery', 'https://www.udemy.com/course/docker-mastery/', 'course', 'fullstack', 21),
('Docker Getting Started Guide', 'https://docs.docker.com/get-started/', 'tutorial', 'fullstack', 21);
