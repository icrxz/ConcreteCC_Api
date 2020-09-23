import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import * as authController from './controllers/authController';
import * as userController from './controllers/userController';
import * as projectController from './controllers/projectController';

const router = express.Router({ mergeParams: true });

router.get('/', (request, response) => {
  return response.json({ message: 'Hello World!'});
});

router.post('/login', (req, resp) => {});
router.post('/logout', (req, resp) => {});

router.get('/users', (req, resp) => userController.indexUser(req, resp));
router.post('/users', (req, resp) => userController.createUser(req, resp));
router.get('/users/:userId', (req, resp) => userController.showUser(req, resp, req.params.userId));

router.get('/projects', (req, resp) => projectController.indexProject(req, resp));
router.post('/projects', (req, resp) => projectController.createProject(req, resp));
router.get('/projects/:projectId', (req, resp) => projectController.showProject(req, resp, req.params.projectId));
router.put('/projects/:projectId', (req, resp) => projectController.deleteProject(req, resp, req.params.projectId));
router.post(
  '/project/:projectId/upload-file',
  multer(multerConfig).single('file'),
  async (req, resp) => projectController.uploadFile(req, resp, req.params.projectId)
);

export default router;
