import { Document } from "mongoose";

export interface IHistory {
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

export interface IHistoryDocument extends IHistory, Document {}
