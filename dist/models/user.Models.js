"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constrants_1 = require("../utils/constrants");
// Create schema
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    cid: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: Object.values(constrants_1.UserRole), // ✅ Converts enum to values array
        default: constrants_1.UserRole.CONSUMER
    },
    password: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', UserSchema);
