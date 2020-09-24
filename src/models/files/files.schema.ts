import { model, Schema } from "mongoose";
import { IFileDocument } from './files.types';

const FileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "project",
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  fileHistories: [{
    type: Schema.Types.ObjectId,
    ref: "history",
  }],
  createdById: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  lastModifiedById: {
    type: Schema.Types.ObjectId,
    ref: "user",
  }
}, {
  timestamps: true,
});

export const FileModel = model<IFileDocument>("file", FileSchema);
