import { Document } from "mongoose";

export interface IOrganization {
  name: string;
  isActive: boolean;
  description: string;
  createdById?: string;
  lastModifiedById?: string;
}

export interface IOrganizationDocument extends IOrganization, Document {};
