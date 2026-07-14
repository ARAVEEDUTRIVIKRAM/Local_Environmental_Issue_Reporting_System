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

```text
React Frontend
        │
        ▼
REST APIs
        │
        ▼
Spring Boot Backend
        │
        ▼
Spring Security
        │
        ▼
JWT Authentication
        │
        ▼
Service Layer
        │
        ▼
Repository Layer
        │
        ▼
PostgreSQL Database
```


# Folder Structure

```text
Local_Environmental_Issue_Reporting_System
│
├── frontend
├── src
│   └── main
│       ├── java
│       │   └── com
│       │       └── environment
│       │           ├── config
│       │           ├── controller
│       │           ├── dto
│       │           ├── exception
│       │           ├── model
│       │           ├── repository
│       │           ├── security
│       │           ├── service
│       │           └── util
│
│       └── resources
│           ├── application.properties
│           └── db
│               └── migration
│
├── Dockerfile
├── docker-compose.yml
└── pom.xml
```


## Database Versioning

Flyway is used for database version control.

Migration files are located at

src/main/resources/db/migration

Each schema update is managed through versioned SQL scripts ensuring reproducible deployments.

## Security

- JWT Authentication
- Spring Security
- Role-Based Authorization
- Stateless Session Management
- Password Encryption
- Protected REST Endpoints

# Role Permissions

| Citizen | Official | Admin |
|-------|----------|----------|
| Report Issues | Update Status | Full System Access |
| Upload Images | Resolve Issues | Manage Users |
| Track Issues | Review Reports | Analytics Dashboard |


# REST APIs

| Module | Sample Endpoints |
|---------|------------------|
| Authentication | `/auth/login`, `/auth/register` |
| Issues | `/issues`, `/issues/{id}` |
| Admin | `/admin/**` |
| Official | `/official/**` |
| Upload | `/upload/**` |
| Notifications | `/notifications/**` |


# Screenshots

<img width="1920" height="871" alt="LandingPage" src="https://github.com/user-attachments/assets/29a5ee23-22c4-4973-b644-8e7039ee89ba" />

<img width="1920" height="872" alt="LoginPage" src="https://github.com/user-attachments/assets/2c1b5a6e-ff40-418b-8078-9e6113fe2271" />

<img width="1920" height="878" alt="CitizenDashboard" src="https://github.com/user-attachments/assets/74b8dba1-013d-437a-bf52-c76e7e7418f9" />

<img width="1920" height="871" alt="ReportIssue " src="https://github.com/user-attachments/assets/d415a368-6e5f-4209-b867-6314d175d182" />

<img width="1920" height="841" alt="IssueList" src="https://github.com/user-attachments/assets/f112753e-ac50-436c-8cbd-b397845e08c9" />

<img width="1920" height="869" alt="OfficialDashBoard" src="https://github.com/user-attachments/assets/ac1500dd-d37c-4392-a927-4a5b6dbeeb3a" />

<img width="1920" height="1080" alt="AdminDashBoard" src="https://github.com/user-attachments/assets/708ed8ab-b66a-40fe-8659-e1acf16b08b5" />

<img width="1920" height="805" alt="Charts" src="https://github.com/user-attachments/assets/d503c4a9-4cae-4769-84c9-859545b7d8cf" />


# Installation

```bash
git clone https://github.com/ARAVEEDUTRIVIKRAM/Local_Environmental_Issue_Reporting_System.git

cd Local_Environmental_Issue_Reporting_System

# Backend
mvn clean install
mvn spring-boot:run

# Frontend
cd frontend
npm install
npm run dev
```


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
