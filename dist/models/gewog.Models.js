"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gewogSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    nameInDzongkha: String,
    dzongkhag: { type: mongoose_1.Schema.Types.ObjectId, ref: "Dzongkhag", required: true },
    area: Number,
    population: Number,
    coordinates: {
        latitude: Number,
        longitude: Number,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Gewog', gewogSchema);
