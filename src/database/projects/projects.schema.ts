import { model, Schema } from "mongoose";
import { IProjectDocument } from './projects.types';

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  files: [{
    type: Schema.Types.ObjectId,
    ref: "file"
  }],
  description: String,
  createdById: String,
  lastModifiedById: String
}, {
  timestamps: true,
});

export const ProjectModel = model<IProjectDocument>("project", ProjectSchema);
