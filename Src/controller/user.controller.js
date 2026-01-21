import {User} from "../../models/user.model.js";

export const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        //basic validation
        if (!username || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }
        //check if user exists
        const existingUser = await User.findOne({$or: [{username}, {email}]});
        if (existingUser) {
            return res.status(409).json({message: 'Username or email already in use'});
        }
        //create new user
        const user = await User.create({
            username, email, password
        });
        return res.status(201).json({message: 'User registered successfully', userId: user._id,email: user.email});
    }
    catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required'});
        }
        
        console.log('Login attempt with email:', email);
        const user = await User.findOne({email});
        console.log('User found:', user ? 'Yes' : 'No');
        
        if (!user) {
            return res.status(400).json({message: 'Invalid email or password'});
        }
        
        console.log('Comparing password...');
        const isMatch = await user.comparePassword(password);
        console.log('Password match result:', isMatch);
        
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid email or password'});
        }
        
        return res.status(200).json({message: 'Login successful', userId: user._id, email: user.email});
    } catch (error) {
        console.error('Error logging in:', error.message);
        console.error('Full error:', error);
        return res.status(500).json({message: 'Internal server error', error: error.message});
    }
};

