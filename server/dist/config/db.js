"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validation_1 = __importDefault(require("../utils/validation"));
const mongoUri = validation_1.default.MONGO_URI;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
    }
};
exports.default = connectDB;
