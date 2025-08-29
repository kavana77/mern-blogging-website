import express from "express";
import * as blogController from "../controllers/blogController";
import authenticateJWT from "../middleware/authentication";
import upload from "../middleware/fileUpload";
import {  Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/bloglist",authenticateJWT, blogController.getBlogs);
router.get("/blogs/:id", authenticateJWT,blogController.getBlogById);
router.get("/search", blogController.getBlogByTitle)
router.put("/updateblog/:id",authenticateJWT,   upload.single("file"),  
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res.status(400).json({ error: { description: "No file uploaded" } });
    }
    next();
  },blogController.updateBlogById)
router.get("/blog/public", blogController.getLimitedBlogs)

export default router;