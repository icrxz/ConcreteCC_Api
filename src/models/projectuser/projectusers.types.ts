import { Document } from "mongoose";

export interface IProjectUser {
    name: number;
    user: string;
    project: string;
    isActive: boolean;
    createdAt?: Date;
    createdById?: string;
    lastModifiedAt?: Date;
    lastModifiedById?: string;
}

export interface IProjectUserDocument extends IProjectUser, Document { };