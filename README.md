# 🔐 Job Finder Backend API

A simple authentication backend built with **Express.js**, **PostgreSQL**, and **Prisma ORM**. This service provides signup, login, and user authentication APIs with secure access tokens and refresh tokens via cookies.

---

## 🚀 Features

- User signup & login with JWT authentication
- Access & refresh token management via HTTP-only cookies
- Protected routes using middleware
- PostgreSQL database with Prisma ORM
- Environment-based configuration
- CORS support for frontend communication

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Auth:** JWT, Cookies
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Language:** TypeScript
- **Other:** dotenv, cookie-parser, cors

---

## 🧪 API Endpoints

Base URL: `http://localhost:5002/api/auth`

| Method | Endpoint  | Description        |
|--------|-----------|--------------------|
| POST   | `/signup` | Register a new user |
| POST   | `/login`  | Authenticate user & return access token |
| GET    | `/me`     | Get current user info (requires auth) |

---

## 📄 Request/Response Example

### 🔐 Signup

**POST** `/api/auth/signup`

```json
Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}

Response
{
  "accessToken": "JWT_TOKEN"
}
