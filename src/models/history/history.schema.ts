import { model, Schema } from "mongoose";
import { IHistoryDocument } from './history.types';

const HistorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profile: {
    type: String,
    required: true
  },
  phone: String,
  role: {
    type: String,
    required: true
  },
  lastModifiedById: {
    type: String
  }
}, {
  timestamps: true,
});

export const HistoryModel = model<IHistoryDocument>("history", HistorySchema);
