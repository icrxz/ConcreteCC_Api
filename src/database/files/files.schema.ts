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
  description: String,
  createdById: String,
  lastModifiedById: String
}, {
  timestamps: true,
});

export const FileModel = model<IFileDocument>("file", FileSchema);
