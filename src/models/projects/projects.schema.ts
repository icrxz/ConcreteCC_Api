import { model, Schema } from "mongoose";
import { IProjectDocument } from './projects.types';

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "organization",
    required: true
  },
  description: {
    type: String,
    required: false
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  files: [{
    type: Schema.Types.ObjectId,
    ref: "file"
  }],
  projectUsers: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
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

export const ProjectModel = model<IProjectDocument>("project", ProjectSchema);
