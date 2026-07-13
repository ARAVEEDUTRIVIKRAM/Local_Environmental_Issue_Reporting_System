# 🌍 Local Environmental Issue Reporting System

A production-ready Full Stack Web Application that enables citizens to report environmental issues, officials to manage issue resolution, and administrators to monitor the overall system through analytics dashboards.

Built using Spring Boot, React, PostgreSQL, JWT Authentication, Role-Based Access Control, Docker, and Flyway.


## 🚀 Live Demo

Live URL: 
https://local-environmental-issue-reporting.vercel.app

GitHub Repository:
https://github.com/ARAVEEDUTRIVIKRAM/Local_Environmental_Issue_Reporting_System


## Demo Accounts

| Role | Username | Password |
|-------|----------|----------|
| Admin | admin | admin123 |
| Official | official | official123 |
| Citizen | citizen | citizen123 |

## Features

✔ JWT Authentication

✔ Role-Based Access Control

✔ Secure REST APIs

✔ Image Upload

✔ Issue Reporting

✔ Issue Tracking

✔ Official Dashboard

✔ Admin Dashboard

✔ Analytics Dashboard

✔ Docker Support

✔ Flyway Database Migration

✔ Responsive React UI

## Tech Stack

### Backend

- Java 17
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- PostgreSQL
- Flyway
- Maven

### Frontend

- React
- Vite
- React Router
- Axios
- CSS

### DevOps

- Docker
- Docker Compose
- Render
- Vercel

### Tools

- Git
- GitHub
- Postman
- IntelliJ IDEA

# Project Architecture

React Frontend
↓

REST APIs

↓

Spring Boot Backend

↓

Spring Security

↓

JWT Authentication

↓

Service Layer

↓

Repository Layer

↓

PostgreSQL Database


# 10. Folder Structure

src

├── controller

├── service

├── repository

├── model

├── dto

├── security

├── config

├── exception

├── util

└── resources

└── db

        └── migration

# 11. Database Migration

Mention Flyway.

```md
## Database Versioning

Flyway is used for database version control.

Migration files are located at

src/main/resources/db/migration

Each schema update is managed through versioned SQL scripts ensuring reproducible deployments.

## Security

JWT Authentication

Spring Security

Role-Based Authorization

Stateless Session Management

Password Encryption

Protected REST Endpoints

# Role Permissions

Instead of paragraphs.

  Citizen	          Official	            Admin
Report Issue  	  Resolve Issue	        Manage Users
Upload Image   	 Change Status	        Analytics
View Issues	     Update Issues	        Full Access

# REST APIs

Authentication APIs

Issue APIs

Admin APIs

Official APIs

Upload APIs

Notification APIs

# Screenshots


# Installation

git clone

cd project

mvn clean install

docker compose up

Run Spring Boot

Run React


# Future Enhancements

Google Maps

Email Notifications

AI Issue Detection

Push Notifications

Mobile App

Location Tracking

Cloud Storage

# Author

Trivikram Araveedu

LinkedIn: https://www.linkedin.com/in/araveedu-trivikram-88b2462bb/

GitHub: https://github.com/ARAVEEDUTRIVIKRAM

Email: araveedutrivikram@gmail.com
