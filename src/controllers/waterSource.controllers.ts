import { Request, Response } from 'express';
import WaterSource from '../models/waterSource.Models';

// Create Water Source
export const createWaterSource = async (req: Request, res: Response): Promise<void> => {
  try {
    const waterSource = new WaterSource(req.body);
    const saved = await waterSource.save();
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Water Sources
export const getWaterSources = async (_req: Request, res: Response): Promise<void> => {
  try {
    const waterSources = await WaterSource.find().populate('gewog');
    res.status(200).json(waterSources);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get Water Source by ID
export const getWaterSourceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const waterSource = await WaterSource.findById(req.params.id).populate('gewog');
    if (!waterSource) {
      res.status(404).json({ message: 'Water Source not found' });
      return;
    }
    res.status(200).json(waterSource);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update Water Source
export const updateWaterSource = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await WaterSource.findByIdAndUpdate(req.params.id, req.body, {
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
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Water Source
export const deleteWaterSource = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await WaterSource.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Water Source not found' });
      return;
    }
    res.status(200).json({ message: 'Water Source deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
