import express from "express";
import "dotenv/config";
import cors from "cors";
import routerUser from "./routes/userRoutes";
import routerBlog from "./routes/blogRoutes"
import routerFile from "./routes/fileRoute"

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "50mb" }));


app.use("/api", routerUser);
app.use("/api", routerBlog);
app.use("/api", routerFile)

export default app;
