import { Post } from "../../models/post.model.js"; 


//Create a new post
export const createPost = async (req, res) => {
    try {
        const {name, description, age} = req.body;
        if (!name || !description || age === undefined) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const post = await Post.create({name, description, age});   

        return res.status(201).json({message: 'Post created successfully', postId: post._id});
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

//Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};
//Get a single post by ID
export const getPostById = async (req, res) => {
    try {
        const {postId} = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        return res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

//Update a post by ID
export const updatePost = async (req, res) => {
    try {
        const {postId} = req.params;
        const {name, description, age} = req.body;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        if (name) post.name = name;
        if (description) post.description = description;
        if (age !== undefined) post.age = age;
        await post.save();
        return res.status(200).json({message: 'Post updated successfully'});
    }
    catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

//Delete a post by ID
export const deletePost = async (req, res) => {
    try {
        const {postId} = req.params;
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        return res.status(200).json({message: 'Post deleted successfully'});
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};
export const logoutUser = async (req, res) => {
    try {
        // In a real application, you might want to handle token invalidation or session destruction here.
        return res.status(200).json({message: 'Logout successful'});
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({message: 'Internal server error', error: error.message});
    }
};
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body; 
        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required'});
        }   
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid password'});
        }   
        return res.status(200).json({message: 'Login successful', userId: user._id, email: user.email});
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({message: 'Internal server error', error: error.message});
    }
};
export const registerUser = async (req, res) => {
    try {   
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const existingUser = await User.findOne({$or: [{email}, {username}]});
        if (existingUser) {
            return res.status(409).json({message: 'Username or email already in use'});
        }   
        const user = await User.create({username, email, password});
        return res.status(201).json({message: 'User registered successfully', userId: user._id, email: user.email});
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

export const updateUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const {username, email, password} = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = password;
        await user.save();
        return res.status(200).json({message: 'User updated successfully'});
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({message: 'Internal server error'});
    }   
};

export const deleteUser = async (req, res) => { 
    try {
        const {userId} = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json({message: 'User deleted successfully'});
    }

    catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

