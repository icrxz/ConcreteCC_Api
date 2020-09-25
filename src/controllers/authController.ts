import { Request, Response, NextFunction } from 'express';
import Bcrypt from 'bcrypt';

import * as jwt from '../utils/jwt'
import { UserModel } from '../models/users/users.schema';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email }).orFail(Error);

    if (Bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ userId: user.id, email: user.email });

      res.setHeader("token", token);
      res.status(200).json({
        message: 'Authenticated',
        token: token,
      });
    } else {
      throw "Access Unauthorized";
    }

  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.setHeader('token', '');
    res.status(200).json({ message: 'Logged Out'});
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
};
