import { Schema } from "mongoose";
import { findOneOrCreate, setUpdatedAt, sameLastName } from "./users.methods";

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  cpf: String,
  birthDate: {
    type: Date,
    default: new Date()
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
});

UserSchema.methods.findOneOrCreate = findOneOrCreate;
UserSchema.methods.setUpdatedAt = setUpdatedAt;
UserSchema.methods.sameLastName = sameLastName;

export default UserSchema;
