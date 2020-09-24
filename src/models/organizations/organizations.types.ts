import { Document } from "mongoose";

export interface IOrganization {
  name: string;
  isActive: boolean;
  description?: string;
  manager: string;
  createdAt: Date;
  createdById: string;
  lastModifiedAt: Date;
  lastModifiedById: string;
}

export interface IOrganizationDocument extends IOrganization, Document {};
