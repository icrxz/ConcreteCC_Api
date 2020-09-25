import { Document } from "mongoose";

export interface IFile {
  name: string;
  fileType: string;
  fileHistories: string[];
  description?: string;
  project: string;
  isActive: boolean;
  createdAt: Date;
  createdById: string;
  lastModifiedAt: Date;
  lastModifiedById: string;
}

export interface IFileDocument extends IFile, Document {}
