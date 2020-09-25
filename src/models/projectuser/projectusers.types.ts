import { Document } from "mongoose";

export interface IProjectUser {
    name: string;
    user: string;
    project: string;
    createdAt?: Date;
    createdById?: string;
    lastModifiedAt?: Date;
    lastModifiedById?: string;
}

export interface IProjectUserDocument extends IProjectUser, Document { };