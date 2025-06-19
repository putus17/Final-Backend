"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.getProfile = exports.login = exports.register = void 0;
const user_Models_1 = __importDefault(require("../models/user.Models"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_utlis_1 = require("../utils/auth.utlis");
const mongoose_1 = __importDefault(require("mongoose"));
// Register user
const register = async (req, res) => {
    try {
        const { name, phone, cid, role, password } = req.body;
        // Validate only required fields
        if (!name || !phone || !cid || !role) {
            res.status(400).json({ error: "Fields required: name, phone, cid, role" });
            return;
        }
        // Check for existing user
        const existingUser = await user_Models_1.default.findOne({ $or: [{ phone }, { cid }] });
        if (existingUser) {
            res.status(409).json({ error: "Phone or CID already registered" });
            return;
        }
        // Hash password only if provided
        const hashedPassword = password ? await bcrypt_1.default.hash(password, 10) : undefined;
        // Create new user, conditionally including password
        const newUser = new user_Models_1.default({
            name,
            phone,
            cid,
            role,
            ...(hashedPassword && { password: hashedPassword }), // Include only if defined
        });
        await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
            data: { id: newUser._id, name, phone, cid, role }
        });
    }
    catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
};
exports.register = register;
// Login user
const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        // Find by email OR username
        const user = await user_Models_1.default.findOne({
            $or: [{ phone: identifier }, { cid: identifier }],
        });
        if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = (0, auth_utlis_1.generateToken)({ userId: user._id.toString(), phone: user.phone, cid: user.cid, role: user.role });
        res.status(200).json({ message: "Login successful", token });
    }
    catch (err) {
        res.status(400).json({ message: "Login failed", error: err.message });
    }
};
exports.login = login;
// Get profile
const getProfile = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        res.status(200).json({ data: (0, auth_utlis_1.sanitizeUser)(req.user), message: `Welcome back, ${req.user.name}`, });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};
exports.getProfile = getProfile;
// Get all users
const getUsers = async (_req, res) => {
    try {
        const users = await user_Models_1.default.find().lean();
        // Sanitize each user in the array
        const sanitizedUsers = users.map(user => (0, auth_utlis_1.sanitizeUser)(user));
        res.status(200).json({
            message: 'Users fetched successfully',
            data: sanitizedUsers,
        });
    }
    catch (error) {
        (0, auth_utlis_1.handleError)(res, error);
    }
};
exports.getUsers = getUsers;
// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }
        const { name, phone, cid, role } = req.body;
        console.log("Received update data:", req.body);
        const updateData = {};
        if (name)
            updateData.name = name;
        if (phone)
            updateData.phone = phone;
        if (cid)
            updateData.cid = cid;
        if (role)
            updateData.role = role;
        if (Object.keys(updateData).length === 0) {
            res.status(400).json({ message: "No valid fields to update" });
            return;
        }
        const updatedUser = await user_Models_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User updated", data: (0, auth_utlis_1.sanitizeUser)(updatedUser) });
    }
    catch (err) {
        console.error("Update failed:", err);
        res.status(400).json({
            message: "Update failed",
            error: err.message,
            details: err.errors || null,
        });
    }
};
exports.updateUser = updateUser;
// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(0, auth_utlis_1.isValidObjectId)(id, res))
            return;
        const deleted = await user_Models_1.default.findByIdAndDelete(id).lean();
        if (!deleted) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (err) {
        (0, auth_utlis_1.handleError)(res, err);
    }
};
exports.deleteUser = deleteUser;
