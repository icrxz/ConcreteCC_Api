import express from 'express';
import multer from 'multer';
import * as multerConfig from './middlewares/multer';
import * as auth from './middlewares/authMiddleware';

import * as authController from './controllers/authController';
import * as userController from './controllers/userController';
import * as projectController from './controllers/projectController';

const router = express.Router({ mergeParams: true });

router.get('/', (request, response) => {
  return response.json({ message: 'Hello from the new world!'});
});

router.get('/test', auth.authMiddleware,(request, response) => {
  return response.json({ message: 'Route Authenticated!'});
})

router.get('/login', (req, resp, next) => authController.login(req, resp, next));
router.post('/logout', (req, resp, next) => authController.logout(req, resp, next));

router.get(
    '/users',
    auth.authMiddleware,(req, resp) => userController.indexUser(req, resp)
  );
router.post(
    '/users',
    (req, resp) => userController.createUser(req, resp)
  );
router.get(
    '/users/:userId',
    auth.authMiddleware,
    (req, resp) => userController.showUser(req, resp, req.params.userId)
  );
router.put(
    '/users/:userId/change-password',
    auth.authMiddleware,
    (req, resp) => userController.changePassword(req, resp, req.params.userId)
  );

router.get(
    '/projects',
    auth.authMiddleware,
    (req, resp) => projectController.indexProject(req, resp)
  );
router.post(
    '/projects',
    auth.authMiddleware,
    (req, resp) => projectController.createProject(req, resp)
  );
router.get(
    '/projects/:projectId',
    auth.authMiddleware,
    (req, resp) => projectController.showProject(req, resp, req.params.projectId)
  );
router.put(
    '/projects/:projectId',
    auth.authMiddleware,
    (req, resp) => projectController.deleteProject(req, resp, req.params.projectId)
  );
router.post(
    '/project/:projectId/upload-file',
    multer(multerConfig).single('file'),
    auth.authMiddleware,
    (req, resp) => projectController.uploadFile(req, resp, req.params.projectId)
  );

export default router;
