import { Schema } from "mongoose";

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
  description: String,
  createdById: String,
  lastModifiedById: String
}, {
  timestamps: true,
});

export default FileSchema;
