"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/dzongkhagModel.ts
const mongoose_1 = require("mongoose");
const constrants_1 = require("../utils/constrants");
const dzongkhagSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    nameInDzongkha: String,
    code: { type: String, required: true, unique: true },
    region: {
        type: String,
        enum: Object.values(constrants_1.RegionType),
        required: true,
    },
    area: Number,
    population: Number,
    coordinates: {
        latitude: Number,
        longitude: Number,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Dzongkhag', dzongkhagSchema);
