import { model, Schema } from "mongoose";
import { IProjectUserDocument } from './projectusers.types';

const ProjectUserSchema = new Schema({
    name: {
        type: Int16Array,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "project"
    }],
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
