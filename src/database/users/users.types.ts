import { Document, Model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  birthDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {
  setLastUpdated: (user: IUserDocument) => Promise<void>;
  sameLastName: (user: IUserDocument) => Promise<Document[]>;
}

export interface IUserModel extends Model<IUserDocument> {
  findOneOrCreate: (
    this: IUserModel,
    {
      firstName,
      lastName,
      birthDate,
      email,
      cpf,
    }: { firstName: string; lastName: string; birthDate: Date, email: string, cpf: string }
  ) => Promise<IUserDocument>;
}
