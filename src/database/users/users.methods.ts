import { IUserDocument } from "./users.types";

export async function setUpdatedAt(user: IUserDocument): Promise<void> {
  const now = new Date();

  if (!user.updatedAt || user.updatedAt < now) {
    user.updatedAt = now;
    await user.save();
  }
}

