import { Request, Response } from 'express';
import Bcrypt from 'bcrypt';

import { UserModel }  from '../database/users/users.model'

export const createUser = async (req: Request, res: Response) => {
  try {
    req.body.password = Bcrypt.hashSync(req.body.password, 10);

    const user = await UserModel.create(req.body);

    return res.json(user)
  } catch (error) {
    return res.status(422).json({ error: 'Registration failed' })
  }
};

export const indexUser = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();

    return res.json(users)
  } catch (error) {
    return res.status(400).json({ error: 'Dont have records' })
  }
};

export const showUser = async (req: Request, res: Response, userId: string) => {
  try {
    const user = await UserModel.findById(userId);

    return res.json(user)
  } catch (error) {
    return res.status(404).json({ error: 'User not found' })
  }
};
