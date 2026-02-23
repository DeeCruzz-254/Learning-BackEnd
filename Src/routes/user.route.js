import express from 'express';
import { 
    registerUser, 
    loginUser, 
    updateUser, 
    deleteUser, 
    logoutUser, 
    getProfile 
} from '../controller/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validateRegister } from '../middleware/validation.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * @description Public Routes
 */
// Added validation middleware to registration
router.post('/register', validateRegister, registerUser);

// Added rate limiting to prevent brute force on login
router.post('/login', loginLimiter, loginUser);

/**
 * @description Protected Routes (Require JWT)
 */
// New route to get current user data
router.get('/profile', protect, getProfile);

// Existing management routes - Now wrapped in 'protect' for security
router.put('/update/:userId', protect, updateUser);
router.delete('/delete/:userId', protect, deleteUser);

// Logout remains a POST, but usually requires 'protect' to identify who is logging out
router.post('/logout', protect, logoutUser);

export default router;