import express from "express";
import "dotenv/config";
import cors from "cors";
import routerUser from "./routes/userRoutes";
import routerBlog from "./routes/blogRoutes";
import routerFile from "./routes/fileRoute";
import connectDB from "./config/db";
import env from "./utils/validation";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/src/uploads", express.static("src/uploads"));
app.use("/api", routerUser);
app.use("/api", routerBlog);
app.use("/api", routerFile);

const PORT = env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
  });
});
