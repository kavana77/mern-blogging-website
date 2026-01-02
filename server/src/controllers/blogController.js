"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogById = exports.getBlogByTitle = exports.getBlogById = exports.getBlogs = exports.getLimitedBlogs = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const fileService_1 = require("../service/fileService");
const getLimitedBlogs = async (req, res) => {
    try {
        const blog = await Blog_1.default.find({}, "title firstLine image createdAt author.name").limit(3);
        if (blog.length === 0) {
            return res.status(400).json({ message: "No Blogs found" });
        }
        res.status(200).json({
            message: "Blogs fetched successfully",
            posts: blog,
            total: blog.length,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch the blog", error });
    }
};
exports.getLimitedBlogs = getLimitedBlogs;
const getBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const [blogs, total] = await Promise.all([
            Blog_1.default.find({}, "title firstLine image createdAt author.name")
                .skip(page * limit)
                .limit(limit),
            Blog_1.default.countDocuments(),
        ]);
        res.status(200).json({ posts: blogs, total });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching Blogs", error });
    }
};
exports.getBlogs = getBlogs;
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog_1.default.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "blog fetched successfully", blog });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching Blogs", error });
    }
};
exports.getBlogById = getBlogById;
const getBlogByTitle = async (req, res) => {
    try {
        const q = req.query.q;
        if (!q.trim()) {
            return res.status(400).json("No search result is found");
        }
        const blogs = await Blog_1.default.find({ title: { $regex: q, $options: "i" } });
        if (blogs.length === 0) {
            return res
                .status(400)
                .json({ message: "No search results found", blogs });
        }
        res.status(200).json({ message: "Fetched successfully", blogs });
    }
    catch (error) {
        console.error("Error in getBlogByTitle:", error);
        res.status(500).json({ message: "Error fetching blogs" });
    }
};
exports.getBlogByTitle = getBlogByTitle;
const updateBlogById = async (req, res) => {
    try {
        const id = req.params.id;
        const blogExist = await Blog_1.default.findById(id);
        if (!blogExist) {
            return res.status(404).json({ message: "Blog not found" });
        }
        const updateData = {
            title: req.body.title,
            firstLine: req.body.firstLine,
            tags: req.body.tags,
            content: req.body.content,
            category: req.body.category,
            readingTime: req.body.readingTime,
        };
        if (req.file) {
            const response = await (0, fileService_1.cloudinaryUpload)(req.file);
            updateData.image = response?.secure_url;
            updateData.imagePublicId = response?.public_id;
        }
        else if (req.body.imageUrl) {
            updateData.image = req.body.imageUrl;
        }
        else {
            updateData.image = blogExist.image;
            updateData.imagePublicId = blogExist.imagePublicId;
        }
        const updatedBlog = await Blog_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        res.status(200).json({ message: "Blog updated successfully", updatedBlog });
    }
    catch (error) {
        res.status(500).send({ message: "Error updating blog data", error });
    }
};
exports.updateBlogById = updateBlogById;
