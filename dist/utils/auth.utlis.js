"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPermissions = exports.sanitizeUser = exports.verifyToken = exports.generateToken = exports.isValidObjectId = exports.handleError = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constrants_1 = require("./constrants");
// Reusable error handler
const handleError = (res, error, statusCode = 400) => {
    const errorMessage = error instanceof Error ? error.message : "Server error";
    res.status(statusCode).json({ message: errorMessage });
};
exports.handleError = handleError;
// Validate MongoDB ObjectID
const isValidObjectId = (id, res) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid user ID format" });
        return false;
    }
    return true;
};
exports.isValidObjectId = isValidObjectId;
// JWT Config
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
// Token generation
const generateToken = (payload) => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};
exports.generateToken = generateToken;
// Token verification
const verifyToken = (token) => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
};
exports.verifyToken = verifyToken;
const sanitizeUser = (user) => {
    const userObj = user.toObject?.() ?? user;
    const { password, __v, ...safe } = userObj;
    return safe;
};
exports.sanitizeUser = sanitizeUser;
const getUserPermissions = async (user) => {
    const roleMap = {
        [constrants_1.UserRole.SUPER_ADMIN]: [
            constrants_1.UserRole.SUPER_ADMIN,
            constrants_1.UserRole.DZONGKHAG_ADMIN,
            constrants_1.UserRole.GEWOG_OPERATOR,
            constrants_1.UserRole.METER_READER,
            constrants_1.UserRole.TECHNICIAN,
            constrants_1.UserRole.QUALITY_INSPECTOR,
            constrants_1.UserRole.FINANCIAL_OFFICER,
            constrants_1.UserRole.VIEWER,
            constrants_1.UserRole.CONSUMER,
        ],
        [constrants_1.UserRole.DZONGKHAG_ADMIN]: [
            constrants_1.UserRole.DZONGKHAG_ADMIN,
            constrants_1.UserRole.GEWOG_OPERATOR,
            constrants_1.UserRole.METER_READER,
            constrants_1.UserRole.TECHNICIAN,
            constrants_1.UserRole.QUALITY_INSPECTOR,
            constrants_1.UserRole.FINANCIAL_OFFICER,
            constrants_1.UserRole.VIEWER,
        ],
        [constrants_1.UserRole.GEWOG_OPERATOR]: [
            constrants_1.UserRole.GEWOG_OPERATOR,
            constrants_1.UserRole.METER_READER,
            constrants_1.UserRole.TECHNICIAN,
            constrants_1.UserRole.VIEWER,
        ],
        [constrants_1.UserRole.METER_READER]: [constrants_1.UserRole.METER_READER],
        [constrants_1.UserRole.TECHNICIAN]: [constrants_1.UserRole.TECHNICIAN],
        [constrants_1.UserRole.QUALITY_INSPECTOR]: [constrants_1.UserRole.QUALITY_INSPECTOR],
        [constrants_1.UserRole.FINANCIAL_OFFICER]: [constrants_1.UserRole.FINANCIAL_OFFICER],
        [constrants_1.UserRole.VIEWER]: [constrants_1.UserRole.VIEWER],
        [constrants_1.UserRole.CONSUMER]: [constrants_1.UserRole.CONSUMER],
    };
    return roleMap[user.role] || [];
};
exports.getUserPermissions = getUserPermissions;
