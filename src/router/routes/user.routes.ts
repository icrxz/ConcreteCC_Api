import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';

import * as userController from '../../controllers/userController';

const userRouter = express.Router({ mergeParams: true });

userRouter.post(
  '/users/',
  (req, resp) => userController.createUser(req, resp)
);

userRouter.get(
  '/users/',
  authMiddleware,
  (req, resp) => userController.indexUser(req, resp)
);

userRouter.get(
  '/users/:userId',
  authMiddleware,
  (req, resp) => userController.showUser(req, resp, req.params.userId)
);

userRouter.put(
  '/users/:userId/change-password',
  authMiddleware,
  (req, resp) => userController.changePassword(req, resp, req.params.userId)
);

export default userRouter;
