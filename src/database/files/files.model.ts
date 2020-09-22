import { model } from "mongoose";
import { IFileDocument } from "./files.types";
import FileSchema from "./files.schema";

export const FileModel = model<IFileDocument>("file", FileSchema);
