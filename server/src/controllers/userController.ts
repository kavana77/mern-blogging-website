import { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import env from "../utils/validation"

export const signUp: RequestHandler = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const user = new User( {fullname, email, password: hashedPassword });
    await user.save();

res.status(201).json({ 
  message: "User created successfully", 
  user 
});  } catch (error) {
    next(error);
  }
};


export const SignIn: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const access_Token = jwt.sign( {_id: user._id}, env.ACCESS_TOKEN_SECRET)
   return res.status(200).json({
      message: "Signed in successfully",
      access_Token,
      user: {
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
