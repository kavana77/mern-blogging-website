"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const fileRoute_1 = __importDefault(require("./routes/fileRoute"));
const db_1 = __importDefault(require("./config/db"));
const validation_1 = __importDefault(require("./utils/validation"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const uploadDir = path_1.default.join(__dirname, "uploads");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir);
}
app.use("/src/uploads", express_1.default.static("src/uploads"));
app.use("/api", userRoutes_1.default);
app.use("/api", blogRoutes_1.default);
app.use("/api", fileRoute_1.default);
const PORT = validation_1.default.PORT || 5001;
(0, db_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(` Server is running on port ${PORT}`);
    });
});
