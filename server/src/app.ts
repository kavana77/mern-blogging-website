import express from "express";
import "dotenv/config";
import cors from "cors";
import routerUser from "./routes/userRoutes";
import routerBlog from "./routes/blogRoutes"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routerUser);
app.use("/api", routerBlog)

export default app;
