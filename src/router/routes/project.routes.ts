import express from 'express';
import multer from 'multer';

import * as multerConfig from '../../middlewares/multer';
import { authMiddleware } from '../../middlewares/authMiddleware';

import * as projectController from '../../controllers/projectController';

const projectRouter = express.Router({ mergeParams: true });


projectRouter.post(
  '/projects/',
  authMiddleware,
  (req, resp) => projectController.createProject(req, resp)
);

projectRouter.put(
  '/projects/:projectId/change-organization',
  authMiddleware,
  (req, resp) => projectController.changeOrganization(req, resp, req.params.projectId)
);

projectRouter.get(
  '/projects/',
  authMiddleware,
  (req, resp) => projectController.indexProject(req, resp)
);

projectRouter.get(
  '/projects/:projectId',
  authMiddleware,
  (req, resp) => projectController.showProject(req, resp, req.params.projectId)
);

projectRouter.get(
  '/projects/:projectId/all-files',  
  authMiddleware,
  (req, resp) => projectController.showFileProject(req, resp, req.params.projectId)
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

projectRouter.post(
  '/projects/:projectId/add-member',
  authMiddleware,
  (req, resp) => projectController.addMember(req, resp, req.params.projectId)
);

projectRouter.delete(
  '/projects/:projectId/remove-member/:userId',
  authMiddleware,
  (req, resp) => projectController.removeMember(req, resp, req.params.projectId, req.params.userId)
);

projectRouter.get(
  '/projects/:projectId/list-members',
  authMiddleware,
  (req, resp) => projectController.listMembers(req, resp, req.params.projectId)
);

export default projectRouter;
