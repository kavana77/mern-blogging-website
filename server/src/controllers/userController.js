"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.SignIn = exports.signUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = __importDefault(require("../utils/validation"));
const signUp = async (req, res, next) => {
    const { fullname, email, password } = req.body;
    try {
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt_1.default.genSalt(6);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        if (!hashedPassword) {
            return res.status(500).json({ message: "Error hashing password" });
        }
        const user = new User_1.default({ fullname, email, password: hashedPassword });
        await user.save();
        res.status(201).json({
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to sign up", error });
    }
};
exports.signUp = signUp;
const SignIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, validation_1.default.ACCESS_TOKEN_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        return res.status(200).json({
            message: "Signed in successfully",
            token,
            user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.SignIn = SignIn;
const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.status(200).json({ message: "Logout Successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.logout = logout;
