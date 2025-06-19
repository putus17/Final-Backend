"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleBasedAccess = exports.authenticate = void 0;
const auth_utlis_1 = require("../utils/auth.utlis");
const user_Models_1 = __importDefault(require("../models/user.Models"));
const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const decoded = (0, auth_utlis_1.verifyToken)(token);
        const user = await user_Models_1.default.findById(decoded.userId);
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }
        req.user = user;
        req.userId = user._id.toString();
        next();
    }
    catch (error) {
        res.status(401).json({
            message: 'Invalid token', error: error.message
        });
        return;
    }
};
exports.authenticate = authenticate;
const roleBasedAccess = (requiredRoles = []) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                res.status(401).json({ message: 'Unauthorized: User not found' });
                return;
            }
            const userPermissions = await (0, auth_utlis_1.getUserPermissions)(req.user);
            const hasAccess = requiredRoles.some((role) => userPermissions.includes(role));
            if (!hasAccess) {
                res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
                return;
            }
            next();
        }
        catch (error) {
            res.status(401).json({ message: 'Invalid permissions', error: error.message });
        }
    };
};
exports.roleBasedAccess = roleBasedAccess;
