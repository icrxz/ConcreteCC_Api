import { model, Schema } from "mongoose";
import { IProjectUserDocument } from './projectusers.types';

const ProjectUserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "project",
        required: true
    },
    createdById: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    lastModifiedById: {
        type: Schema.Types.ObjectId,
        ref: "user",
    }
}, {
    timestamps: true,
});

export const ProjectUserModel = model<IProjectUserDocument>("projectuser", ProjectUserSchema);
