# 🌍 Local Environmental Issue Reporting System

## Problem Statement

Local environmental issues such as garbage dumping, water leakage, drainage problems, and illegal constructions often go unreported or unresolved due to the lack of a simple, transparent reporting mechanism. Existing processes are fragmented, slow, and provide little visibility to citizens once a complaint is raised.

This project addresses that gap by providing a **centralized, web-based platform** where users can report environmental issues, track their submissions, and view reported issues in a structured and accessible way.

---

## 🧠 System Overview

The Local Environmental Issue Reporting System is a **full-stack web application** built using **React.js** on the frontend and **Spring Boot REST APIs** on the backend.

The application enables authenticated users to:

* Register and log in securely
* Submit environmental issue reports with relevant details
* View and track previously submitted issues

The system is designed with a clear separation between frontend presentation, backend business logic, and database persistence.

---

## 🏗️ Architecture

### Frontend

* Built using **React.js** with a component-based architecture
* Uses **Axios** for API communication
* Implements responsive UI using **Tailwind CSS**
* Supports **Dark / Light mode** for better accessibility
* Handles form validation and user feedback

### Backend

* Developed using **Spring Boot** following REST principles
* Layered architecture:

  * Controller layer for request handling
  * Service layer for business logic
  * Repository layer using Spring Data JPA
* Authentication endpoints for user registration and login
* RESTful APIs for complaint submission and retrieval

### Database

* **MySQL** database for storing user data and complaint records
* JPA/Hibernate used for ORM and database interaction

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* Tailwind CSS
* Axios

**Backend**

* Java
* Spring Boot
* Spring Web
* Spring Data JPA

**Database**

* MySQL

**Tools & Build**

* Maven
* Git & GitHub

**Deployment**

* Frontend: Vercel
* Backend: Hosted separately (Spring Boot API)

---

## 🚀 Core Features

* User registration and login (authentication system)
* Submit new environmental issues with title, description, and location
* View submitted issues in a structured tabular format
* Responsive UI with modern design
* Dark / Light mode toggle
* RESTful backend APIs for easy frontend integration

---

## 🔁 Application Flow

1. User registers or logs in through the frontend
2. Authentication request is sent to the backend API
3. Upon successful authentication, the user can submit new issue reports
4. Backend validates request data and persists issue details in the database
5. User can view previously submitted issues through API-driven data retrieval

---

## 🧪 Testing & Validation

The application was manually tested using:

* Browser-based testing for UI and user flows
* API testing via frontend integration

### Validated Scenarios:

* User registration and login with valid and invalid credentials
* Form validation for empty or incorrect inputs
* Successful and failed issue submissions
* Retrieval of reported issues
* UI responsiveness across screen sizes

---

## ⚠️ Edge Cases Considered

* Submitting complaints without authentication
* Missing or invalid request fields
* Empty issue lists for new users
* UI behavior on slow or failed API responses

---

## 🌐 Live Demo

🔗 [https://local-environmental-issue-reporting.vercel.app/](https://local-environmental-issue-reporting.vercel.app/)

---

## 📸 Screenshots

*(Screenshots are included below to demonstrate the user interface and application flow.)*

---

## 📌 Known Limitations

* No role-based access control (admin vs user)
* No automated unit or integration test suite
* Limited status tracking for reported issues
* Backend deployment scalability not optimized for production-scale usage

---

## 🔮 Future Improvements

* Add issue status lifecycle (Open, In Progress, Resolved)
* Implement role-based access (Admin dashboard)
* Add automated testing (JUnit / Integration tests)
* Improve issue categorization and filtering
* Add notification system for issue updates

---

## 👨‍💻 Author

**Araveedu Trivikram**
GitHub: [https://github.com/ARAVEEDUTRIVIKRAM](https://github.com/ARAVEEDUTRIVIKRAM)












