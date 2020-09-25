import { Request, Response } from 'express';
import Bcrypt from 'bcrypt';

import { UserModel }  from '../models/users/users.schema'
import * as jwt from '../utils/jwt';

export const createUser = async (req: Request, res: Response) => {
  try {

    req.body.password = Bcrypt.hashSync(req.body.password, 10);

    const user = await UserModel.create(req.body);

    return res.status(200).json(user)
  } catch (error) {
    return res.status(422).json({ message: error })
  }
};

export const indexUser = async (res: Response) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json({ message: error })
  }
};

export const showUser = async (res: Response, userId: string) => {
  try {
    const user = await UserModel.findById(userId).orFail(Error);

    return res.status(200).json(user)
  } catch (error) {
    return res.status(404).json({ message: error })
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const token = req.headers['auth'] as string;
    const { userId } = jwt.verify(token) as any;

    const { lastPassword, newPassword, confirmationPassword } = req.body;
    const user = await UserModel.findById(userId).orFail(Error);

    if (
      Bcrypt.compareSync(lastPassword, user.password) &&
      newPassword === confirmationPassword
      ) {

        user.password = Bcrypt.hashSync(newPassword, 10);
        user.lastModifiedById = userId;
        user.save();
    }

    return res.status(200).json(user)
  } catch (error) {
    return res.status(404).json({ message: error })
  }
};
