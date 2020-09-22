import { Document } from "mongoose";

export interface IProject {
  name: string;
  isActive: boolean;
  description: string;
  createdById?: string;
  lastModifiedById?: string;
}

export interface IProjectDocument extends IProject, Document {}
