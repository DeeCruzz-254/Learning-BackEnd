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

export const updateUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const {username, email, password} = req.body;
        
        if (!userId) {
            return res.status(400).json({message: 'User ID is required'});
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = password;
        
        const updatedUser = await user.save();
        return res.status(200).json({message: 'User updated successfully', userId: updatedUser._id, email: updatedUser.email});
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

export const deleteUser = async (req, res) => {
    try {
        const {userId} = req.params;
        
        if (!userId) {
            return res.status(400).json({message: 'User ID is required'});
        }
        
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        
        return res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

export const logoutUser = async (req, res) => {
    try {
        // In a stateless JWT authentication, logout can be handled on the client side
        const{email}=req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        };
        return res.status(200).json({message: 'Logout successful'});
    } catch (error) {
        console.error('Error logging out user:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
}  
