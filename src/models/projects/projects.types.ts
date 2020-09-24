import { Document } from "mongoose";

export interface IProject {
  name: string;
  isActive: boolean;
  organization: string;
  description?: string;
  manager: string;
  createdAt: Date;
  createdById: string;
  lastModifiedAt: Date;
  lastModifiedById: string;
}

export interface IProjectDocument extends IProject, Document {}
