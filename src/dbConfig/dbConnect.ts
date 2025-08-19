import mongoose from "mongoose";

export async function dbConnect() {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI!);
    } catch (e) {
        process.exit(1);
    }
}