"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileController = void 0;
const fileService_1 = require("../service/fileService");
const Blog_1 = __importDefault(require("../models/Blog"));
const fileController = async (req, res) => {
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ error: { description: "No file uploaded" } });
        }
        const response = await (0, fileService_1.cloudinaryUpload)(req.file);
        const { title, firstLine, content, tags, category, readingTime } = req.body;
        const blog = new Blog_1.default({
            title,
            firstLine,
            content,
            tags,
            category,
            readingTime,
            image: response?.secure_url,
            imagePublicId: response?.public_id,
        });
        await blog.save();
        return res.status(200).json({
            message: "File uploaded successfully",
            uploadResult: response,
        });
    }
    catch (error) {
        console.error("Controller error:", error);
        return res.status(500).json({ message: "Failed to upload file", error });
    }
};
exports.fileController = fileController;
