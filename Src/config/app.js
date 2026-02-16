// Src/config/app.js — express app instance
import express from 'express';
import cors from 'cors';

//routes can be imported and used here as needed
import userRoutes from '../routes/user.route.js';

// Example of importing another route file
import postRoutes from '../routes/post.route.js';

// Create Express app
const app = express();

// Enable CORS for frontend communication
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json()); //middleware to parse JSON bodies

// Use imported routes
app.use('/api/v1/posts', postRoutes);
//routes declaration example
app.use('/api/v1/users', userRoutes);

//example route: http://localhost:3000/api/v1/users/register

export default app;