// Src/config/database.js — connect to MongoDB
import mongoose from "mongoose";

// Connect to MongoDB; exit on failure
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;