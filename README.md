# Final Project - DevSteps

This repository contains the final project of CodeOp's FSPT33 Fullstack Development course. It was developed in group, with the collaboration of all students.

## About this project

This project is called "DevSteps". Is tailored for coding bootcamp graduates, helping to organize and streamline their job search to land their first developer role. With this application, the graduate student will be able to register and have a personal account, and also have a personal profile were they can add and display the skills they had studied. Once logged in, the graduate will be able to store different jobs that may accord with their own skills, location and description.
Also, this application has a section of resources, were the graduate can excercise on different assignments, based on backend, fullstack or frontend technologies.

## Features

- Job Tracker Organizer
  Adds, updates, deletes and filter jobs.

- Learning Platform
  Displays and filters learning resources based on discipline, skill and type of content.

- Registration

- Authentication and authorization
  User needs to authenticate in order to log in, and their information will be protected.

- Profile
  Displays user information and adds skills

- File Upload
  The user is able to upload their profile picture

## Technologies used

### Frontend

React, ReactRouter, React Context, Vite, CSS, FormData.

### Backend

Node.js, Express, MySQL, Multer, JWT, bcrypt, Uuid, Mime-Type.

### Project Management

Kanban board, Notion and Figma.

### Version control system

Git, Github.

## Deployment

If you want to use this repository:

1 - Clone the repository

```bash
 git clone https://github.com/vicrodgim/finalmvp.git
```

2 - Once you have clone this repository, you'll be able to do commits with `git commit -m "Example Message"` and push it to github with `git push`

## Setup

### Database prep

- Create the local MySQL database and table(s) to be used.
- Add a `.env` to your root folder containing the MySQL authentication information for the root user as well as the name of your database. For example:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=YOURPASSWORD
DB_NAME=YOURDATABASE
SUPER_SECRET="secret string"
```

### Dependencies

- `cd server` and run `npm install`. This will install server's project dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Migration

- Run `npm run migrate` to create all the database tables named `users`, `jobs`, `skills`, `skills_users`, `resources`, `resources_skills` and `jobs_skills`.

### Development

- Run `npm start` in project directory to start the Express server on port 4000
- `cd client` and run `npm run dev` to start client server in development mode with hot reloading in port 5173.
- You can test your client app in `http://localhost:5173`
- You can test your API in:
  `http://localhost:4000/api/jobs`
  `http://localhost:4000/api/users`
  `http://localhost:4000/api/skills`
  `http://localhost:4000/api/resources`
  `http://localhost:4000/api/images`

## About the structure

### Database Structure

This database uses a relational model with several interconnected tables to store and organize the data.

- Main Tables

-- Users Table
Stores information about registered users.
Columns: id, username, first_name, last_name, description, location, email, password, imageUrl

-- Jobs Table
Contains details about job postings.
Columns: id, user_id (foreign key referencing users), title, company_name, location, location_type, description, type, date_range, min_salary, max_salary, has_applied, created_at, url

-- Skills Table
Lists available skills
Columns: id, title, category

-- Resources Table
Stores information about learning resources
Columns: id, title, url, type, discipline

- Junction Tables

These tables establish relationships between the main tables:

-- Skills_Users Table
Connects users with their skills
Columns: user_id, skill_id, proficiency_level

-- Resources_Skills Table
Links resources to relevant skills
Columns: resource_id, skill_id

-- Jobs_Skills Table
Associates jobs with required skills
Columns: job_id, skills_id

- Relationships
  A user can have multiple skills (one-to-many)
  A skill can be possessed by multiple users (many-to-one)
  A resource can relate to multiple skills (many-to-many)
  A job posting can require multiple skills (many-to-many)

- Constraints and Foreign Keys

The schema uses foreign keys with ON DELETE CASCADE to maintain referential integrity:

Deleting a user will automatically delete their associated job postings and skills
Deleting a skill will remove it from all associated users, resources, and jobs
Deleting a resource will remove its associations with skills
Deleting a job will remove its associations with skills

### Frontend components

The src folder contains four principal folders: components, context, elements and pages.

- components Folder

Contains at the same time 7 folders: (which contains their respective components and css) and 4 components with their css (HomePage, Login, PrivateRoute and Register). This section

- context Folder

Contains one js file, for the React context functionality.

- elements Folder

Contains the nav button component.

- pages Folder

Contains the 3 principal pages of our application, that are LearningPage, MyJobs and MyProfile.

## Colaborators

### Instructors

We would like to give special thanks to both our teachers, who accompanied and guided us throughout the process of developing our project and were of great help at all times.

- Zoe Laventhol
- Sofia Moura

### Team members (full names / github account)

- Victoria Rodriguez Gimenez - vicrodgim
- Mara Caldarini - maz-com
- Sarah Seo - Runnersmj
- Maria Emilia Bonetti - memi-bonagui

## Notes

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._
