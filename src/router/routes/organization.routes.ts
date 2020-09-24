import express from 'express';

import { authMiddleware } from '../../middlewares/authMiddleware';

import * as organizationController from '../../controllers/organizationController';

const organizationRouter = express.Router({ mergeParams: true });

organizationRouter.get(
  '/organizations/',
  authMiddleware,
  (req, resp) => organizationController.indexOrganization(req, resp)
);

organizationRouter.post(
  '/organizations/',
  authMiddleware,
  (req, resp) => organizationController.createOrganization(req, resp)
);

organizationRouter.get(
  '/organizations/:organizationId',
  authMiddleware,
  (req, resp) => organizationController.showOrganization(req, resp, req.params.organizationId)
);

organizationRouter.delete(
  '/organizations/:organizationId',
  authMiddleware,
  (req, resp) => organizationController.deleteOrganization(req, resp, req.params.organizationId)
);

export default organizationRouter;
