import mongoose, { Document } from 'mongoose';

interface IWaterSource extends Document {
  name: string;
  type: string;
  gewog: mongoose.Types.ObjectId;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  altitude?: number;
  capacity?: number;
  flowRate?: number;
  waterQuality?: {
    pH?: number;
    turbidity?: number;
    totalDissolvedSolids?: number;
    bacterialCount?: number;
    lastTested?: Date;
  };
  status?: string;
  seasonalVariation?: {
    monsoon?: number;
    winter?: number;
    spring?: number;
    autumn?: number;
  };
}

const waterSourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  gewog: { type: mongoose.Schema.Types.ObjectId, ref: 'Gewog', required: true },
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

export default mongoose.model<IWaterSource>('WaterSource', waterSourceSchema);
 
