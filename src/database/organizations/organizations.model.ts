import { model } from "mongoose";
import { IOrganizationDocument } from "./organizations.types";
import OrganizationSchema from "./organizations.schema";

export const OrganizationModel = model<IOrganizationDocument>("organization", OrganizationSchema);
