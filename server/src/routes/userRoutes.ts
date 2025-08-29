import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/signin", userController.SignIn);
router.post("/logout", userController.logout)

export default router;
