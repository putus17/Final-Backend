"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const waterSourceSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    gewog: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Gewog', required: true },
    coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    altitude: Number,
    capacity: Number,
    flowRate: Number,
    waterQuality: {
        pH: Number,
        turbidity: Number,
        totalDissolvedSolids: Number,
        bacterialCount: Number,
        lastTested: Date,
    },
    status: { type: String, default: 'Active' },
    seasonalVariation: {
        monsoon: Number,
        winter: Number,
        spring: Number,
        autumn: Number,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('WaterSource', waterSourceSchema);
