import mongoose from "mongoose"
import env from "../utils/validation"

const mongoUri = env.MONGO_URI

const connectDB = async()=> {
    try {
        await mongoose.connect(mongoUri)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("MongoDB connection error:", error)
    }
}
export default connectDB