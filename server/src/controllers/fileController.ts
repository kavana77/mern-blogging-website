import { RequestHandler } from "express";
import cloudinary from "../config/cloudinary";

export const upload: RequestHandler = async (req, res) => {
  try {
    const { image } = req.body; // This should be a base64 string: "data:image/png;base64,...."

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const result = await cloudinary.uploader.upload(image, {
      public_id: `blog_${Date.now()}`,
      folder: "blog-images",
      resource_type: "image",
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
};
