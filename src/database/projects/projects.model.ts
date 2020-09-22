import { model } from "mongoose";
import { IProjectDocument } from "./projects.types";
import ProjectSchema from "./projects.schema";

export const ProjectModel = model<IProjectDocument>("project", ProjectSchema);
