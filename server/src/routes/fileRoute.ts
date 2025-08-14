import express from "express";
import * as fileController from "../controllers/fileController";

const router = express.Router();

router.post("/upload", fileController.upload)

export default router