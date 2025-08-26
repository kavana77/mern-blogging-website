import express from "express";
import * as blogController from "../controllers/blogController";
import authenticateJWT from "../middleware/authentication";

const router = express.Router();

router.get("/bloglist", blogController.getBlogs);
router.get("/blogs/:id", blogController.getBlogById);
router.get("/search", blogController.getBlogByTitle)
router.put("/updateblog/:id", blogController.updateBlogById)

export default router;