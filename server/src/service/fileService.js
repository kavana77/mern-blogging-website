"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = void 0;
const cloudinary_1 = require("../config/cloudinary");
const fs_1 = __importDefault(require("fs"));
const cloudinaryUpload = async (file) => {
    try {
        const cloudinaryResponse = await (0, cloudinary_1.uploadToCloudinary)(file.path);
        fs_1.default.unlink(file.path, (err) => {
            if (err) {
                console.error("Error deleting local file:", err);
            }
        });
        return cloudinaryResponse;
    }
    catch (error) {
        console.error("Cloudinary upload failed:", error);
    }
};
exports.cloudinaryUpload = cloudinaryUpload;
