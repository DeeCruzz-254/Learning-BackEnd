// Src/config/index.js — load env, connect DB, start server
import dotenv from "dotenv";
import connectDB from "./database.js";
import app from "./app.js";

// Load .env into process.env
dotenv.config({ path: './.env' });

const startServer = async () => {
    try {
        // Connect to DB before starting
        await connectDB();

        // Log and rethrow app errors
        app.on("error", (error) => {
            console.log("Server error:", error);
            throw error;
        });

        console.log("Database connected successfully");

        // Start the HTTP server
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    } catch (error) {
        console.log("MongoDb connection error:", error);
        process.exit(1);
    }
};

startServer();
