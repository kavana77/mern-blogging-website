"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    firstLine: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    imagePublicId: { type: String },
    tags: [String],
    category: { type: String, default: "General" },
    readingTime: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});
const Blog = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = Blog;
