import { Schema } from "mongoose";

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

export default OrganizationSchema;
