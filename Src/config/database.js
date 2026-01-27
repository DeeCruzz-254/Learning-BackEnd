// Src/config/database.js — connect to MongoDB
import mongoose from "mongoose";

// Connect to MongoDB; exit on failure
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10,
            minPoolSize: 2,
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 5000,
            retryWrites: true,
            w: "majority"
        });
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;