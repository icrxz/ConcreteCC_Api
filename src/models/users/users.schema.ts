import { model, Schema } from "mongoose";
import { IUserDocument } from './users.types';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  profile: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  projectUsers: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
  createdById: {
    type: String,
    required: false
  },
  lastModifiedById: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

export const UserModel = model<IUserDocument>("user", UserSchema);
