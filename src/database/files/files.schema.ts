import { model, Schema } from "mongoose";
import { IFileDocument } from './files.types';

const FileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  fileType: {
    type: String,
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "project",
  },
  fileHistory: [{
    type: Schema.Types.ObjectId,
    ref: "history",
  }],
  description: String,
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
