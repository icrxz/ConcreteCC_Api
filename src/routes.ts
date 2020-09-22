import express from 'express';
import * as authController from './controllers/authController';
import * as userController from './controllers/userController';

const router = express.Router({ mergeParams: true });

router.get('/', (request, response) => {
  return response.json({ message: 'Hello World!'});
});

router.post('/login', (req, resp) => {})
router.post('/logout', (req, resp) => {})

router.get('/users', (req, resp) => userController.indexUser(req, resp))
router.post('/users', (req, resp) => userController.createUser(req, resp))
router.get('/users/:userId', (req, resp) => userController.showUser(req, resp, req.params.userId))

export default router;
