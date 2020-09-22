import { Request, Response } from 'express';
import Bcrypt from 'bcrypt';

import { UserModel }  from '../database/users/users.model'

export const createUser = async (req: Request, res: Response) => {
  try {
    req.body.password = Bcrypt.hashSync(req.body.password, 10);

    const user = await UserModel.create(req.body);

    return res.send({ user })
  } catch (error) {
    return res.status(422).send({ error: 'Registration failed' })
  }
};

export const indexUser = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();

    return res.send({ users })
  } catch (error) {
    return res.status(400).send({ error: 'Dont have records' })
  }
};

export const showUser = async (req: Request, res: Response, userId: string) => {
  try {
    const user = await UserModel.findById(userId);

    return res.send({ user })
  } catch (error) {
    return res.status(404).send({ error: 'User not found' })
  }
};
