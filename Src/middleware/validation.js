import { body, validationResult } from 'express-validator';

export const validateRegister = [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('username').isLength({ min: 3 }).withMessage('Username must be 3+ chars'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];