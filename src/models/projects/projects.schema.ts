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
  organization: {
    type: Schema.Types.ObjectId,
    ref: "organization",
  },
  files: [{
    type: Schema.Types.ObjectId,
    ref: "file"
  }],
  description: String,
  manager: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
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

export const ProjectModel = model<IProjectDocument>("project", ProjectSchema);
