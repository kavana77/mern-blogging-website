import express from "express";
import * as blogController from "../controllers/blogController";
import authenticateJWT from "../middleware/authentication";

const router = express.Router();

router.get("/bloglist",authenticateJWT, blogController.getBlogs);
router.get("/blogs/:id",authenticateJWT, blogController.getBlogById);

export default router;