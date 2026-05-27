import {User} from "../../models/user.model.js";
import generateToken from "../utils/generateTokens.js";
import maskEmail from "../utils/maskEmail.js";

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
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                userId: user._id,
                username: user.username,
                email: maskEmail(user.email)
            }
        });
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
        
        // Generate JWT token
        const token = generateToken(user._id);
        // Prepare a display name (capitalize first letter) for welcome message
        const displayName = user.username
            ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
            : 'User';

        return res.status(200).json({
            message: 'Login successful',
            welcome: `Welcome ${displayName}`,
            token,
            user: {
                userId: user._id,
                username: user.username,
                email: maskEmail(user.email)
            }
        });
    } catch (error) {
        console.error('Error logging in:', error.message);
        console.error('Full error:', error);
        return res.status(500).json({message: 'Internal server error', error: error.message});
    }
};


// --- NEW FUNCTION ADDED HERE ---
export const getProfile = async (req, res) => {
    try {
        // req.user comes from your protect middleware
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Do not expose the raw email in responses; return a masked copy
        const safeUser = user.toObject ? user.toObject() : {...user};
        if (safeUser.email) safeUser.email = maskEmail(safeUser.email);
        return res.status(200).json({ success: true, user: safeUser });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching profile" });
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
        return res.status(200).json({message: 'User updated successfully', user: {
            userId: updatedUser._id,
            username: updatedUser.username,
            email: maskEmail(updatedUser.email)
        }});
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
