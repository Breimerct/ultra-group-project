import { MONGODB_URI } from "@/const/env.const";
import mongoose, { connection } from "mongoose";

if (!MONGODB_URI) {
    console.error("No MongoDB URI provided");
    process.exit(1);
}

const conn = {
    isConnected: false,
};

const connectDB = async () => {
    if (conn.isConnected) return;

    const db = await mongoose.connect(MONGODB_URI as string);

    conn.isConnected = !!db.connections[0].readyState;
    console.log(`MongoDB Connected: ${conn.isConnected}`);
};

connection.on("connected", () => {
    console.log("MongoDB connected");
});

connection.on("error", (error) => {
    console.error(`MongoDB connection error: ${error}`);
});

export default connectDB;
