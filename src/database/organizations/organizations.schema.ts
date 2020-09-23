import { model, Schema } from "mongoose";
import { IOrganizationDocument } from './organizations.types';

const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  description: String,
  createdById: String,
  lastModifiedById: String
}, {
  timestamps: true,
});

export const OrganizationModel = model("organization", OrganizationSchema);
