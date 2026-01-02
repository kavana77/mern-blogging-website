"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
}, {
    timestamps: true,
});
userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt_1.default.compare(userPassword, this.password);
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
