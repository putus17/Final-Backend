"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL);
        console.log(`🔌 Connection State: ${mongoose_1.default.connection.readyState === 1 ? '🟢 Connected to database' : '🔴 Unable to connect try again'}`);
    }
    catch (error) {
        console.error(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
        console.error('🚫 Database connection failed');
        process.exit(1);
    }
};
exports.default = connectDB;
