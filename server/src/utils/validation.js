"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const envalid_1 = require("envalid");
const validators_1 = require("envalid/dist/validators");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, validators_1.port)(),
    MONGO_URI: (0, validators_1.str)(),
    CLOUDINARY_CLOUD_NAME: (0, validators_1.str)(),
    CLOUDINARY_API_KEY: (0, validators_1.str)(),
    CLOUDINARY_API_SECRET: (0, validators_1.str)(),
    CLOUDINARY_UPLOAD_FOLDER: (0, validators_1.str)(),
    ACCESS_TOKEN_SECRET: (0, validators_1.str)()
});
