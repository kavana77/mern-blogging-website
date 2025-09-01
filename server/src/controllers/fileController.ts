import { RequestHandler } from "express";
import { cloudinaryUpload } from "../service/fileService";
import Blog from "../models/Blog";

export const fileController: RequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      console.error("No file found in controller");
      return res
        .status(400)
        .json({ error: { description: "No file uploaded" } });
    }

    const response = await cloudinaryUpload(req.file);

    const { title, firstLine, content, tags, category, readingTime } = req.body;
    const blog = new Blog({
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
  } catch (error) {
    console.error("Controller error:", error);
    return res.status(500).json({ message: "Failed to upload file", error });
  }
};
