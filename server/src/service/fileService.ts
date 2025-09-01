import { uploadToCloudinary } from "../config/cloudinary";
import fs from "fs";

export const cloudinaryUpload = async (file: Express.Multer.File) => {
  try {
    const cloudinaryResponse = await uploadToCloudinary(file.path);

    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
      }
    });

    return cloudinaryResponse;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
  }
};
