import Blog from "../models/Blog";
import { RequestHandler } from "express";

export const createBlog: RequestHandler = async (req , res, next) => {
    const data = req.body;
    try {
        const newBlog = await Blog.create(data)
        res.status(201).json({ message: "Blog created successfully", newBlog})
    } catch (error) {
        next(error)
    }
}

export const getBlogs: RequestHandler = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);

    const [blogs, total] = await Promise.all([
      Blog.find({}, "title firstLine image createdAt author.name")
        .skip(page * limit)
        .limit(limit),
      Blog.countDocuments(),
    ]);

    res.status(200).json({ posts: blogs, total });
  } catch (error) {
    next(error);
  }
};

export const getBlogById: RequestHandler = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "blog fetched successfully", blog });
  } catch (error) {
    next(error);
  }
};

