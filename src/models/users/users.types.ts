import { Document } from "mongoose";

export interface IUser {
  name: string;
  password: string;
  role: string;
  email: string;
  phone?: string;
  profile: string;
  createdAt?: Date;
  createdById?: string;
  lastModifiedAt?: Date;
  lastModifiedById?: string;
}

export interface IUserDocument extends IUser, Document {};