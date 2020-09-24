import { model, Schema } from "mongoose";
import { IOrganizationDocument } from './organizations.types';

const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  description: {
    type: String,
    required: false
  },
    manager: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  projects:[{
    type: Schema.Types.ObjectId,
    ref: "project"
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

export const OrganizationModel = model<IOrganizationDocument>("organization", OrganizationSchema);
