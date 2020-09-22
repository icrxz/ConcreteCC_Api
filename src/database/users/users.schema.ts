import { Schema } from "mongoose";
import { setUpdatedAt } from "./users.methods";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profile: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: new Date()
  },
  lastModifiedDate: {
    type: Date,
    default: new Date()
  },
  lastModifiedById: {
    type: String
  }
});

UserSchema.methods.setUpdatedAt = setUpdatedAt;

export default UserSchema;
