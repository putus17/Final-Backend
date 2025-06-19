"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const waterSource_controllers_1 = require("../controllers/waterSource.controllers");
const router = (0, express_1.Router)();
// Create a new water source
router.post('/', waterSource_controllers_1.createWaterSource);
// Get all water sources
router.get('/', waterSource_controllers_1.getWaterSources);
// Get a single water source by ID
router.get('/:id', waterSource_controllers_1.getWaterSourceById);
// Update a water source by ID
router.put('/:id', waterSource_controllers_1.updateWaterSource);
// Delete a water source by ID
router.delete('/:id', waterSource_controllers_1.deleteWaterSource);
exports.default = router;
