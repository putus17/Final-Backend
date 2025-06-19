"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateValidator = exports.userLoginValidator = exports.userSignupValidator = exports.validate = exports.isValidObjectId = void 0;
const express_validator_1 = require("express-validator");
const user_Models_1 = __importDefault(require("../models/user.Models")); // Adjust import path if needed
const constrants_1 = require("./constrants"); // Adjust import path
const mongoose_1 = __importDefault(require("mongoose"));
const isValidObjectId = (id, res) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid user ID format" });
        return false;
    }
    return true;
};
exports.isValidObjectId = isValidObjectId;
const validate = (validations) => {
    return async (req, res, next) => {
        for (const validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty())
                break;
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(422).json({ errors: errors.array() });
    };
};
exports.validate = validate;
// Signup validator
exports.userSignupValidator = [
    (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),
    (0, express_validator_1.body)("phone")
        .trim()
        .matches(/^\+?975?(1[6-9]|7[1-7])\d{6}$/) // Bhutan phone number format (+977 optional, 8-10 digits)
        .withMessage("Valid Bhutan phone number is required"),
    (0, express_validator_1.body)("cid")
        .trim()
        .isLength({ min: 11, max: 11 }) // assuming CID is 11 chars (adjust if needed)
        .withMessage("CID must be exactly 11 characters")
        .custom(async (cid) => {
        const user = await user_Models_1.default.findOne({ cid });
        if (user) {
            throw new Error("CID already in use");
        }
        return true;
    }),
    (0, express_validator_1.body)("role")
        .optional()
        .isIn(Object.values(constrants_1.UserRole))
        .withMessage(`Role must be one of: ${Object.values(constrants_1.UserRole).join(", ")}`),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];
// Login validator (assuming login by phone or cid)
exports.userLoginValidator = [
    (0, express_validator_1.body)("identifier")
        .trim()
        .notEmpty()
        .withMessage("Phone or CID is required")
        .custom((value) => {
        const isPhone = /^\+?975?(1[6-9]|7[1-7])\d{6}$/.test(value);
        const isCid = /^\d{11}$/.test(value);
        if (!isPhone && !isCid) {
            throw new Error("Must be a valid Bhutan phone number or CID");
        }
        return true;
    }),
];
// Update user validator (partial updates allowed)
exports.userUpdateValidator = [
    (0, express_validator_1.param)("id")
        .isMongoId()
        .withMessage("Invalid user ID"),
    (0, express_validator_1.body)("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty"),
    (0, express_validator_1.body)("phone")
        .optional()
        .trim()
        .matches(/^\+?977\d{8,10}$/)
        .withMessage("Valid Bhutan phone number is required"),
    (0, express_validator_1.body)("cid")
        .optional()
        .trim()
        .isLength({ min: 11, max: 11 })
        .withMessage("CID must be exactly 11 characters")
        .custom(async (cid, { req }) => {
        const user = await user_Models_1.default.findOne({ cid });
        if (user && req.params?.id && user._id.toString() !== req.params.id) {
            throw new Error("CID already in use");
        }
        return true;
    }),
    (0, express_validator_1.body)("role")
        .optional()
        .isIn(Object.values(constrants_1.UserRole))
        .withMessage(`Role must be one of: ${Object.values(constrants_1.UserRole).join(", ")}`),
    (0, express_validator_1.body)("password")
        .optional()
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];
