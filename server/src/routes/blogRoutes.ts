import express from "express";
import * as blogController from "../controllers/blogController";

const router = express.Router();

router.get("/bloglist", blogController.getBlogs);
router.get("/blogs/:id", blogController.getBlogById);

export default router;