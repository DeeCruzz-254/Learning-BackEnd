# Backend - Learning Backend Project

## Overview
This directory contains the backend implementation of the Learning Backend project, featuring user authentication with secure password hashing and MongoDB integration.

## Key Components

### 📁 Directory Structure
- **Src/** - Main source code
  - `config/` - Configuration and setup files (app.js, database.js, constants.js, index.js)
  - `controller/` - Business logic (user.controller.js)
  - `routes/` - API route definitions (user.route.js)
- **models/** - Mongoose schemas and models
  - `user.model.js` - User schema with password hashing

### 🔐 Authentication Features
- User registration with validation
  - Username validation (3-30 characters, unique)
  - Email validation (unique, lowercase)
  - Password hashing with bcrypt (10 salt rounds)
- Secure login with bcrypt password comparison
- MongoDB integration with Mongoose ORM
- Error handling and validation

### 🛠️ Tech Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM (Object Data Modeling)
- **bcrypt** - Password hashing library
- **Nodemon** - Development auto-reload

## Getting Started
Refer to the main [README.md](../README.md) for complete setup and installation instructions.

## API Endpoints
See the main README for detailed API endpoint documentation:
- `POST /api/v1/users/register` - Create new user account
- `POST /api/v1/users/login` - Authenticate user

## Database Schema
The User model includes:
- username (String, unique, required)
- email (String, unique, required, lowercase)
- password (String, hashed with bcrypt)
- timestamps (createdAt, updatedAt)

## Security Implementation
✅ Passwords hashed before storage using bcrypt  
✅ Pre-save hooks for automatic hashing  
✅ Secure password comparison methods  
✅ Input validation and error handling  
✅ Unique constraints on username and email  

## Contributing
Feel free to extend and improve the backend implementation!

**Last Updated**: January 27, 2026
