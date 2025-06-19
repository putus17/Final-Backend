import { Router } from 'express';
import {
  createWaterSource,
  getWaterSources,
  getWaterSourceById,
  updateWaterSource,
  deleteWaterSource,
} from '../controllers/waterSource.controllers';

const router = Router();

// Create a new water source
router.post('/', createWaterSource);

// Get all water sources
router.get('/', getWaterSources);

// Get a single water source by ID
router.get('/:id', getWaterSourceById);

// Update a water source by ID
router.put('/:id', updateWaterSource);

// Delete a water source by ID
router.delete('/:id', deleteWaterSource);

export default router;
