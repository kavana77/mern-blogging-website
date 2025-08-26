import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import env from "../utils/validation"

export const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  } );
};

export const generateSignature = (paramsToSign: Record<string, string | number>): string => {
  const { api_secret } = cloudinary.config() ;

  const sortedParams = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join("&");

  return crypto.createHash("sha1").update(sortedParams + api_secret).digest("hex");
};

export const uploadToCloudinary = async (filePath: string) => {
  try {
    cloudinaryConfig();

    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = { timestamp };
    const signature = generateSignature(paramsToSign);

    const result = await cloudinary.uploader.upload(filePath, {
      ...paramsToSign,
      signature,
      api_key: process.env.CLOUDINARY_API_KEY,
    });

    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
  }
};
