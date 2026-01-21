# Learning Backend 🚀

An entry-level Node.js/Express backend project demonstrating user authentication with secure password hashing using bcrypt and MongoDB database integration.

---

## 📋 Project Overview

This is a learning project built to understand core backend concepts including:
- RESTful API design
- User authentication (registration & login)
- Password security with bcrypt hashing
- MongoDB database integration
- Middleware usage
- Error handling

---

## ✨ Features Implemented

### ✅ Completed Features
- **User Registration** - Create new accounts with validation
  - Username (3-30 characters, unique, lowercase)
  - Email (unique, lowercase)
  - Password (minimum 6 characters, auto-hashed with bcrypt)
  - Duplicate user prevention

- **User Login** - Authenticate with email/password
  - Find user by email
  - Secure password comparison using bcrypt
  - Success/error responses with user ID

- **Database Integration**
  - MongoDB Atlas connection via Mongoose
  - User schema with timestamps
  - Pre-save password hashing hook
  - Password comparison method

- **API Structure**
  - Clean separation of concerns (routes, controllers, models)
  - Error handling with try/catch
  - Proper HTTP status codes
  - JSON responses

---

## 🏗️ Project Structure

```
Learning-BackEnd/
├── Src/
│   ├── config/
│   │   ├── index.js           # Server startup and initialization
│   │   ├── app.js             # Express app setup with middleware
│   │   ├── database.js        # MongoDB connection
│   │   └── constants.js       # Configuration constants
│   ├── controller/
│   │   └── user.controller.js # Business logic (registerUser, loginUser)
│   └── routes/
│       └── user.route.js      # Route definitions
├── models/
│   └── user.model.js          # Mongoose schema and methods
├── package.json               # Dependencies
└── .env                       # Environment variables (not committed)
```

---

## 🛠️ Tech Stack

- **Runtime**: Node.js v22.20.0
- **Framework**: Express.js v5.2.1
- **Database**: MongoDB with Mongoose v9.1.0
- **Security**: bcrypt v6.0.0 (password hashing)
- **Development**: Nodemon v3.1.11 (auto-reload)
- **Environment**: dotenv v17.2.3

---

## 🚀 Getting Started

### Prerequisites
- Node.js v22.20.0+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DeeCruzz-254/Learning-BackEnd.git
   cd Learning-BackEnd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the root directory
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm run dev      # Development (with nodemon)
   npm start        # Production
   ```

   Server will run on `http://localhost:3000`

---

## 📡 API Endpoints

### Register User
- **URL**: `POST /api/v1/users/register`
- **Body**:
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepass123"
  }
  ```
- **Success (201)**:
  ```json
  {
    "message": "User registered successfully",
    "userId": "507f1f77bcf86cd799439011",
    "email": "john@example.com"
  }
  ```
- **Error (400)**: Missing required fields
- **Error (409)**: Username or email already in use

### Login User
- **URL**: `POST /api/v1/users/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepass123"
  }
  ```
- **Success (200)**:
  ```json
  {
    "message": "Login successful",
    "userId": "507f1f77bcf86cd799439011",
    "email": "john@example.com"
  }
  ```
- **Error (400)**: Invalid email or password
- **Error (400)**: Missing required fields

---

## 🔒 Security Features

✅ **Password Hashing**: Passwords are hashed using bcrypt with salt rounds of 10 before storage  
✅ **Pre-save Hook**: Automatic password hashing on user creation  
✅ **Secure Comparison**: Password comparison using bcrypt.compare()  
✅ **Input Validation**: Basic validation for required fields  
✅ **Unique Constraints**: Username and email are unique in database  

---

## 📊 Progress & Achievements

### Phase 1: Foundation ✅
- [x] Project setup with Express and Node.js
- [x] MongoDB connection setup
- [x] User model creation with Mongoose
- [x] Basic project structure

### Phase 2: Authentication ✅
- [x] User registration endpoint
- [x] User login endpoint
- [x] Password hashing with bcrypt
- [x] Input validation
- [x] Error handling

### Phase 3: Current Status ✅
- [x] All endpoints working
- [x] Database integration complete
- [x] Password security implemented
- [x] API tested and functional

---

## 🚧 Future Improvements

### Short Term
- [ ] Add email validation (validator library)
- [ ] Add JWT token authentication for protected routes
- [ ] Create protected endpoints that require authentication
- [ ] Implement logout functionality
- [ ] Add rate limiting to prevent brute force attacks

### Medium Term
- [ ] User profile management (update username, email, etc.)
- [ ] Password reset functionality
- [ ] Email verification on registration
- [ ] Session management
- [ ] API documentation with Swagger/OpenAPI

### Long Term
- [ ] OAuth integration (Google, GitHub)
- [ ] Role-based access control (RBAC)
- [ ] Admin dashboard
- [ ] Comprehensive test suite (Jest, Supertest)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Deployment (Heroku, AWS, DigitalOcean)

---

## 🐛 Known Issues & Fixes

| Issue | Status | Solution |
|-------|--------|----------|
| Password validation error | ✅ Fixed | Minimum 6 characters required |
| Bcrypt import error | ✅ Fixed | Using `bcrypt` instead of `bcryptjs` |
| Pre-save hook error | ✅ Fixed | Removed `next()` callback in async function |
| MongoDB connection fails | ✅ Fixed | IP whitelist configured in MongoDB Atlas |
| `loggedIn` field undefined | ✅ Fixed | Removed unused field from registration |

---

## 📝 Testing with Postman

1. **Register a user**
   - Method: POST
   - URL: `http://localhost:3000/api/v1/users/register`
   - Body (JSON):
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "password123"
     }
     ```

2. **Login with the same credentials**
   - Method: POST
   - URL: `http://localhost:3000/api/v1/users/login`
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```

---

## 📚 Learning Resources Used

- Express.js documentation
- Mongoose documentation
- bcrypt security best practices
- RESTful API design principles
- MongoDB Atlas guides

---

## 👤 Author

**Samwel** - [GitHub](https://github.com/DeeCruzz-254/Learning-BackEnd)

---

## 📄 License

ISC

---

## 🙏 Acknowledgments

Thanks to all resources and documentation that helped in building this learning project!

---

**Last Updated**: January 21, 2026  
**Project Status**: Active Development ✅
