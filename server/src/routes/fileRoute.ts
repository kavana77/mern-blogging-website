import express from "express";
import {  Request, Response, NextFunction } from "express";
import upload from "../middleware/fileUpload";
import { fileController } from "../controllers/fileController";
import authenticateJWT from "../middleware/authentication";

const router = express.Router();

router.post(
  "/upload",authenticateJWT,
  upload.single("file"),  
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res.status(400).json({ error: { description: "No file uploaded" } });
    }
    next();
  },
  fileController
);

export default router
