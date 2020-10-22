import express from 'express';

import { authMiddleware } from '../../middlewares/authMiddleware';
import * as authController from '../../controllers/authController';

const authRouter = express.Router({ mergeParams: true });

authRouter.get('/', (request, response) => {
  return response.json({ message: 'Hello from the new world!'});
});

authRouter.get('/test', authMiddleware,(request, response) => {
  return response.json({ message: 'Route Authenticated!'});
})

authRouter.post(
  '/login',
  (req, resp, next) => authController.login(req, resp, next)
);

authRouter.post(
  '/logout',
  (req, resp, next) => authController.logout(req, resp, next)
);

export default authRouter;
