import { model, Schema } from "mongoose";
import { IHistoryDocument } from './history.types';

const HistorySchema = new Schema({
  file: {
    type: Schema.Types.ObjectId,
    ref: "file",
    required: true
  },  
  externalURL: {
    type: String,
    required: true
  },
  versionNumber: {
    type: Int16Array,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  createdById: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  lastModifiedById: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
}, {
  timestamps: true,
});

export const HistoryModel = model<IHistoryDocument>("history", HistorySchema);
