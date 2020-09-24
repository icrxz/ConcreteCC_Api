import { integer } from "aws-sdk/clients/cloudfront";
import { Document } from "mongoose";

export interface IHistory {
  file: string;
  externalURL: string;
  versionNumber: number;
  isActive: boolean;
  createdAt?: Date;
  createdById?: string;
  lastModifiedAt?: Date;
  lastModifiedById?: string;
}

export interface IHistoryDocument extends IHistory, Document {}
