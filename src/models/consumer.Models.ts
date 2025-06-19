import mongoose, { Schema, model } from 'mongoose';
import { IConsumer } from '../types/index';

const consumerSchema = new Schema<IConsumer>({
  householdId: { type: String, required: true, unique: true },
  householdHead: {
    name: String,
    citizenshipId: String,
    phoneNumber: String,
  },
  address: {
    gewog: { type: mongoose.Schema.Types.ObjectId, ref: 'Gewog', required: true },
    village: String,
    houseNumber: String,
  },
  familySize: Number,
  connectionType: {
    type: String,
    enum: ['Individual', 'Shared', 'Community_Standpost'],
    required: true,
  },
  meterNumber: String,
  connectionDate: Date,
  status: {
    type: String,
    enum: ['Active', 'Disconnected', 'Suspended'],
    default: 'Active',
  },
  tariffCategory: {
    type: String,
    enum: ['Domestic', 'Commercial', 'Industrial', 'Institutional'],
    default: 'Domestic',
  },
}, { timestamps: true });

export const ConsumerModel = model<IConsumer>('Consumer', consumerSchema);
