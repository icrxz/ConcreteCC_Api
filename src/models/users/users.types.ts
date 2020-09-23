import { Document } from "mongoose";

export interface IUser {
  name: string;
  password: string;
  email: string;
  role: string;
  profile: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastModifiedById?: string;
}

export interface IUserDocument extends IUser, Document {};
