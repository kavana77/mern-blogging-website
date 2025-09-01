import { Schema, model } from "mongoose";
import { IBlog } from "../types/blogType";

const blogSchema = new Schema<IBlog>({
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

const Blog = model("Blog", blogSchema);
export default Blog;
