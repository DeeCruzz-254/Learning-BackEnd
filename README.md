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

### Frontend (static) quick serve

The frontend is a static folder at `frontend/` that can be served independently. Example options:

- With Python:
```powershell
cd frontend
python -m http.server 5500
```
Open: `http://localhost:5500`

- With `http-server` (Node):
```powershell
cd frontend
npx http-server -p 5500
```
Open: `http://localhost:5500`

Note: The backend runs on `http://localhost:3000` by default; adjust ports if changed in your `.env`.

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
    "welcome": "Welcome JohnDoe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGMyOTNhZWY4YzMwMDAyNDU2YzEyMyIsImlhdCI6MTcwODY4OTUxMywiZXhwIjoxNzExMjgxNTEzfQ.asdf1234...",
    "user": {
      "userId": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "email": "jo*****@example.com"
    }
  }
  ```
- **Error (400)**: Invalid email or password
- **Error (400)**: Missing required fields

### Get User Profile (Protected)
- **URL**: `GET /api/v1/users/profile`
- **Headers**:
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Success (200)**:
  ```json
  {
    "success": true,
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "email": "john@example.com",
      "createdAt": "2026-02-23T12:15:13.425Z",
      "updatedAt": "2026-02-23T12:15:13.425Z"
    }
  }
  ```
- **Error (401)**: Not authorized, no token
- **Error (401)**: Token failed (invalid or expired)

---

## 🔒 Security Features

✅ **Password Hashing**: Passwords are hashed using bcrypt with salt rounds of 10 before storage  
✅ **Pre-save Hook**: Automatic password hashing on user creation  
✅ **Secure Comparison**: Password comparison using bcrypt.compare()  
✅ **JWT Authentication**: JWT tokens for stateless authentication  
✅ **Token Expiration**: Tokens expire after 30 days  
✅ **Protected Routes**: Auth middleware protects sensitive endpoints  
✅ **Input Validation**: Email, username, and password validation  
✅ **Unique Constraints**: Username and email are unique in database  
✅ **Rate Limiting**: Login attempts limited to 10 per 15 minutes  

---

## 🛡️ Data Masking (Emails)

- **Purpose**: Protect user privacy by masking email usernames in API responses while keeping the original email stored securely for authentication.
- **Where implemented**: reusable utility at `Src/utils/maskEmail.js`.
- **Behavior**:
  - Only the first two characters of the email username remain visible.
  - Remaining characters before the `@` are replaced with `*`.
  - The domain stays unchanged.
  - Examples:
    - `johndoe@gmail.com` → `jo*****@gmail.com`
    - `alex@yahoo.com` → `al**@yahoo.com`
    - `ab@site.com` → `ab@site.com` (username length ≤ 2, returned unchanged)
- **Important**: Masking occurs only on responses sent to clients. The database keeps the full email for login, verification, and other backend operations. If you need a masked copy stored in DB (for auditing or display-only use), add a separate `maskedEmail` field explicitly — do not replace the original email used for authentication.

### How to verify masking
- Backend returns masked emails in `register`, `login`, `profile` and `update` responses. Example login response includes `user.email` masked and a `welcome` message.
- Use the frontend or a simple curl/PowerShell request to `POST /api/v1/users/login` and inspect the JSON `user.email` field.


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

### Phase 3: JWT Implementation ✅
- [x] JWT token generation on login
- [x] Token verification middleware
- [x] Protected routes with auth middleware
- [x] Get user profile endpoint
- [x] Token expiration (30 days)
- [x] Bearer token validation
- [x] ES6 module conversion

### Phase 4: Current Status ✅
- [x] All endpoints working including JWT-protected routes
- [x] Database integration complete
- [x] Password security implemented
- [x] JWT authentication fully functional
- [x] API tested and verified with Postman/Insomnia

---

## 🚧 Future Improvements

### Short Term
- [ ] Add email validation (validator library)
- [ ] Implement logout functionality with token blacklist
- [ ] Add refresh token mechanism
- [ ] User update endpoint with auth

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
| Module system mismatch | ✅ Fixed | Converted all files to ES6 (import/export) |
| JWT not generated on login | ✅ Fixed | Added `generateToken()` call to loginUser controller |

---

## 📝 Testing with Postman/Insomnia

### 1. Register a User
   - **Method**: POST
   - **URL**: `http://localhost:3000/api/v1/users/register`
   - **Body** (JSON):
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "password123"
     }
     ```

### 2. Login to Get JWT Token
   - **Method**: POST
   - **URL**: `http://localhost:3000/api/v1/users/login`
   - **Body** (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```
   - **📌 Copy the `token` from the response**

### 3. Access Protected Route (Get Profile)
   - **Method**: GET
   - **URL**: `http://localhost:3000/api/v1/users/profile`
   - **Headers**:
     - **Key**: `Authorization`
     - **Value**: `Bearer <paste_token_here>`
   - **Expected**: User profile data without password

### 4. Test Token Validation
   - Try accessing `/api/v1/users/profile` **without** the Authorization header
   - **Expected**: `401 - Not authorized, no token`

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

**Last Updated**: February 23, 2026  
**Project Status**: Active Development ✅

---

## 🎨 Recent Updates

**v2.0 - JWT Authentication** (Feb 23, 2026)
- ✅ Implemented JWT token generation on login
- ✅ Added `protect` middleware for route authentication
- ✅ Created `/profile` protected endpoint
- ✅ Added token expiration (30 days)
- ✅ Converted all files to ES6 modules
- ✅ Added rate limiting to login endpoint

**v1.0 - Foundation** (Jan 27, 2026)
- Initial project setup with user registration/login
- Password hashing with bcrypt
- MongoDB integration
