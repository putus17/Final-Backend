"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWaterSource = exports.updateWaterSource = exports.getWaterSourceById = exports.getWaterSources = exports.createWaterSource = void 0;
const waterSource_Models_1 = __importDefault(require("../models/waterSource.Models"));
// Create Water Source
const createWaterSource = async (req, res) => {
    try {
        const waterSource = new waterSource_Models_1.default(req.body);
        const saved = await waterSource.save();
        res.status(201).json(saved);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createWaterSource = createWaterSource;
// Get all Water Sources
const getWaterSources = async (_req, res) => {
    try {
        const waterSources = await waterSource_Models_1.default.find().populate('gewog');
        res.status(200).json(waterSources);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getWaterSources = getWaterSources;
// Get Water Source by ID
const getWaterSourceById = async (req, res) => {
    try {
        const waterSource = await waterSource_Models_1.default.findById(req.params.id).populate('gewog');
        if (!waterSource) {
            res.status(404).json({ message: 'Water Source not found' });
            return;
        }
        res.status(200).json(waterSource);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getWaterSourceById = getWaterSourceById;
// Update Water Source
const updateWaterSource = async (req, res) => {
    try {
        const updated = await waterSource_Models_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            res.status(404).json({ message: 'Water Source not found' });
            return;
        }
        res.status(200).json({
            data: updated,
            message: 'Water Source updated successfully',
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateWaterSource = updateWaterSource;
// Delete Water Source
const deleteWaterSource = async (req, res) => {
    try {
        const deleted = await waterSource_Models_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: 'Water Source not found' });
            return;
        }
        res.status(200).json({ message: 'Water Source deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteWaterSource = deleteWaterSource;
