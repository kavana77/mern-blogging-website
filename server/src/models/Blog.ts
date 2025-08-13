import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstLine: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  tags: [String],
  category: { type: String, default: "General" },
  author: {
    name: { type: String, required: true },
    bio: String,
    profilePic: String,
    socialLinks: {
      twitter: String,
      github: String,
      linkedin: String,
    },
  },
  readingTime: { type: String }, 
  reactions: {
    like: { type: Number, default: 0 },
    love: { type: Number, default: 0 },
    fire: { type: Number, default: 0 },
    wow: { type: Number, default: 0 },
  },
  comments: [
    {
      name: String,
      comment: String,
      date: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

export default mongoose.model("Blog", blogSchema);
