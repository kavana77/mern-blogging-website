import Blog from "../models/Blog";
import { RequestHandler } from "express";
import { cloudinaryUpload } from "../service/fileService";

export const getLimitedBlogs: RequestHandler = async (req, res) => {
  try {
    const blog = await Blog.find(
      {},
      "title firstLine image createdAt author.name"
    ).limit(3);
    if (blog.length === 0) {
      return res.status(400).json({ message: "No Blogs found" });
    }
    res.status(200).json({
      message: "Blogs fetched successfully",
      posts: blog,
      total: blog.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch the blog", error });
  }
};
export const getBlogs: RequestHandler = async (req, res) => {
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
    res.status(500).json({ message: "Error fetching Blogs", error });
  }
};

export const getBlogById: RequestHandler = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "blog fetched successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Blogs", error });
  }
};

export const getBlogByTitle: RequestHandler = async (req, res) => {
  try {
    const q = req.query.q as string;
    if (!q.trim()) {
      return res.status(200).json("No search result is found");
    }
    const blogs = await Blog.find({ title: { $regex: q, $options: "i" } });
    if (blogs.length === 0) {
      return res
        .status(200)
        .json({ message: "No search results found", blogs });
    }
    res.status(200).json({ message: "Fetched successfully", blogs });
  } catch (error) {
    console.error("Error in getBlogByTitle:", error);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

export const updateBlogById: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const blogExist = await Blog.findById(id);
    if (!blogExist) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const updateData: any = {
      title: req.body.title,
      firstLine: req.body.firstLine,
      tags: req.body.tags,
      content: req.body.content,
      category: req.body.category,
      readingTime: req.body.readingTime,
    };
    if (req.file) {
      const response = await cloudinaryUpload(req.file);
      updateData.image = response?.secure_url;
      updateData.imagePublicId = response?.public_id;
    } else if (req.body.imageUrl) {
      updateData.image = req.body.imageUrl
    }else {
      updateData.image = blogExist.image
      updateData.imagePublicId = blogExist.imagePublicId
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    res.status(500).send({ message: "Error updating blog data", error });
  }
};
