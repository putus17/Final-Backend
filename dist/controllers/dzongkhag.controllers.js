"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDzongkhag = exports.updateDzongkhag = exports.getDzongkhags = exports.getDzongkhagById = exports.createDzongkhag = void 0;
const dzongkhag_Models_1 = __importDefault(require("../models/dzongkhag.Models"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_utlis_1 = require("../utils/auth.utlis");
const createDzongkhag = async (req, res) => {
    const { name, nameInDzongkha, code, region, area, population, coordinates, latitude, longitude, createdBy } = req.body;
    try {
        const event = await dzongkhag_Models_1.default.create({
            name,
            nameInDzongkha,
            code,
            region,
            area,
            population,
            coordinates,
            latitude,
            longitude,
            createdBy
        });
        res.status(201).json({
            message: '  Dzongkhag added',
            data: event,
        });
    }
    catch (err) {
        res
            .status(400)
            .json({ message: 'Error Create dzongkhag', error: err.message });
    }
};
exports.createDzongkhag = createDzongkhag;
const getDzongkhagById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid Dzongkhag ID' });
            return;
        }
        const dzongkhag = await dzongkhag_Models_1.default.findById(id);
        if (!dzongkhag) {
            res.status(404).json({ message: 'Dzongkhag not found' });
            return;
        }
        res.json(dzongkhag);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get Dzongkhag', error });
    }
};
exports.getDzongkhagById = getDzongkhagById;
// Get all users
const getDzongkhags = async (_req, res) => {
    try {
        const dzongkhag = await dzongkhag_Models_1.default.find().lean();
        res.status(200).json({
            message: 'Users fetched successfully',
            data: dzongkhag,
        });
    }
    catch (error) {
        (0, auth_utlis_1.handleError)(res, error);
    }
};
exports.getDzongkhags = getDzongkhags;
const updateDzongkhag = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid Dzongkhag ID' });
            return;
        }
        const dzongkhag = await dzongkhag_Models_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!dzongkhag) {
            res.status(404).json({ message: 'Dzongkhag not found' });
            return;
        }
        res.json(dzongkhag);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to update Dzongkhag', error });
    }
};
exports.updateDzongkhag = updateDzongkhag;
const deleteDzongkhag = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid Dzongkhag ID' });
            return;
        }
        const dzongkhag = await dzongkhag_Models_1.default.findByIdAndDelete(id);
        if (!dzongkhag) {
            res.status(404).json({ message: 'Dzongkhag not found' });
            return;
        }
        res.json({ message: 'Dzongkhag deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete Dzongkhag', error });
    }
};
exports.deleteDzongkhag = deleteDzongkhag;
