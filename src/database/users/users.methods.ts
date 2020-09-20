import { Document } from "mongoose";
import { IUserDocument, IUserModel } from "./users.types";

export async function findOneOrCreate(
  user: IUserModel,
  userId: string
): Promise<IUserDocument> {
  const record = await user.findOne({ userId });

  if (record) {
    return record;
  } else {
    return user.create();
  }
}

export async function setUpdatedAt(user: IUserDocument): Promise<void> {
  const now = new Date();

  if (!user.updatedAt || user.updatedAt < now) {
    user.updatedAt = now;
    await user.save();
  }
}

export async function sameLastName(user: IUserDocument): Promise<Document[]> {
  return user.model("user").find({ lastName: user.lastName });
}
