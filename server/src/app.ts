import express from "express";
import "dotenv/config";
import cors from "cors";
import routerUser from "./routes/userRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routerUser);

export default app;
