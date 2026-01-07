"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = __importDefault(require("../utils/validation"));
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res
            .status(403)
            .json({ message: "No token provided, authorization denied." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, validation_1.default.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res
            .status(401)
            .json({ message: "Invalid token, authorization denied." });
    }
};
exports.default = authenticateJWT;
