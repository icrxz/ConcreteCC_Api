import { Document } from "mongoose";

export interface IFile {
  name: string;
  isDeleted: boolean;
  fileType: string;
  description: string;
  createdById?: string;
  lastModifiedById?: string;
}

export interface IFileDocument extends IFile, Document {}
