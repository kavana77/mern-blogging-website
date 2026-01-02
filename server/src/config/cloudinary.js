"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = exports.generateSignature = exports.cloudinaryConfig = void 0;
const cloudinary_1 = require("cloudinary");
const crypto_1 = __importDefault(require("crypto"));
const validation_1 = __importDefault(require("../utils/validation"));
const cloudinaryConfig = () => {
    cloudinary_1.v2.config({
        cloud_name: validation_1.default.CLOUDINARY_CLOUD_NAME,
        api_key: validation_1.default.CLOUDINARY_API_KEY,
        api_secret: validation_1.default.CLOUDINARY_API_SECRET,
    });
};
exports.cloudinaryConfig = cloudinaryConfig;
const generateSignature = (paramsToSign) => {
    const { api_secret } = cloudinary_1.v2.config();
    const sortedParams = Object.keys(paramsToSign)
        .sort()
        .map((key) => `${key}=${paramsToSign[key]}`)
        .join("&");
    return crypto_1.default.createHash("sha1").update(sortedParams + api_secret).digest("hex");
};
exports.generateSignature = generateSignature;
const uploadToCloudinary = async (filePath) => {
    try {
        (0, exports.cloudinaryConfig)();
        const timestamp = Math.round(new Date().getTime() / 1000);
        const paramsToSign = { timestamp };
        const signature = (0, exports.generateSignature)(paramsToSign);
        const result = await cloudinary_1.v2.uploader.upload(filePath, {
            ...paramsToSign,
            signature,
            api_key: process.env.CLOUDINARY_API_KEY,
        });
        return result;
    }
    catch (error) {
        console.error("Cloudinary upload error:", error);
    }
};
exports.uploadToCloudinary = uploadToCloudinary;
