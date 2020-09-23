import express from 'express';
import multer from 'multer';

import * as multerConfig from '../../middlewares/multer';
import { authMiddleware } from '../../middlewares/authMiddleware';

import * as projectController from '../../controllers/projectController';

const projectRouter = express.Router({ mergeParams: true });

projectRouter.get(
  '/projects/',
  authMiddleware,
  (req, resp) => projectController.indexProject(req, resp)
);

projectRouter.post(
  '/projects/',
  authMiddleware,
  (req, resp) => projectController.createProject(req, resp)
);

projectRouter.get(
  '/projects/:projectId',
  authMiddleware,
  (req, resp) => projectController.showProject(req, resp, req.params.projectId)
);

projectRouter.delete(
  '/projects/:projectId',
  authMiddleware,
  (req, resp) => projectController.deleteProject(req, resp, req.params.projectId)
);

projectRouter.post(
  '/projects/:projectId/upload-file',
  multer(multerConfig).single('file'),
  authMiddleware,
  (req, resp) => projectController.uploadFile(req, resp, req.params.projectId)
);

export default projectRouter;
