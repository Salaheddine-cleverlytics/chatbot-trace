import mongoose from "mongoose";
import {config} from "./config";



export async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(config.mongodb.uri!, config.mongodb.options);
        console.log("✅ MongoDB connected");
    } catch (err: any) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    }
}