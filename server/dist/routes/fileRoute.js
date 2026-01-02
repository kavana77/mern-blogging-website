"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileUpload_1 = __importDefault(require("../middleware/fileUpload"));
const fileController_1 = require("../controllers/fileController");
const authentication_1 = __importDefault(require("../middleware/authentication"));
const router = express_1.default.Router();
router.post("/upload", authentication_1.default, fileUpload_1.default.single("file"), (req, res, next) => {
    if (!req.file) {
        return res
            .status(400)
            .json({ error: { description: "No file uploaded" } });
    }
    next();
}, fileController_1.fileController);
exports.default = router;
