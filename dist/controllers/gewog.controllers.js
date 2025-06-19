"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGewog = exports.updateGewog = exports.getGewogs = exports.getGewogById = exports.createGewog = void 0;
const gewog_Models_1 = __importDefault(require("../models/gewog.Models"));
const mongoose_1 = __importStar(require("mongoose"));
const auth_utlis_1 = require("../utils/auth.utlis");
// Create Gewog
const createGewog = async (req, res) => {
    const { name, nameInDzongkha, dzongkhag, area, population, coordinates, createdBy, } = req.body;
    try {
        const gewog = await gewog_Models_1.default.create({
            name,
            nameInDzongkha,
            dzongkhag: new mongoose_1.Types.ObjectId(dzongkhag), // Convert string to ObjectId
            area,
            population,
            coordinates,
            createdBy,
        });
        res.status(201).json({
            message: 'Gewog added',
            data: gewog,
        });
    }
    catch (err) {
        res
            .status(400)
            .json({ message: 'Error creating Gewog', error: err.message });
    }
};
exports.createGewog = createGewog;
// Get gewogs by id/ single gewog
const getGewogById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid Gewog ID' });
            return;
        }
        const gewog = await gewog_Models_1.default.findById(id).populate('dzongkhag');
        if (!gewog) {
            res.status(404).json({ message: 'Gewog not found' });
            return;
        }
        res.json(gewog);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get Gewog', error });
    }
};
exports.getGewogById = getGewogById;
// Get all Gewogs
const getGewogs = async (_req, res) => {
    try {
        const gewogs = await gewog_Models_1.default.find().populate('dzongkhag').lean();
        res.status(200).json({
            message: 'Gewogs fetched successfully',
            data: gewogs,
        });
    }
    catch (error) {
        (0, auth_utlis_1.handleError)(res, error);
    }
};
exports.getGewogs = getGewogs;
// Update gewog informaton
const updateGewog = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid Gewog ID' });
            return;
        }
        const gewog = await gewog_Models_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!gewog) {
            res.status(404).json({ message: 'Gewog not found' });
            return;
        }
        res.json(gewog);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to update Gewog', error });
    }
};
exports.updateGewog = updateGewog;
// Delete gewog
const deleteGewog = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid Gewog ID' });
            return;
        }
        const gewog = await gewog_Models_1.default.findByIdAndDelete(id);
        if (!gewog) {
            res.status(404).json({ message: 'Gewog not found' });
            return;
        }
        res.json({ message: 'Gewog deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete Gewog', error });
    }
};
exports.deleteGewog = deleteGewog;
