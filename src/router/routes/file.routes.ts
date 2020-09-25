import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';

import * as fileController from '../../controllers/fileController';

const fileRouter = express.Router({ mergeParams: true });

fileRouter.get(
  '/files/',
  authMiddleware,
  (req, resp) => fileController.indexFile(req, resp)
);

fileRouter.get(
  '/files/:fileId',
  authMiddleware,
  (req, resp) => fileController.showFile(req, resp, req.params.fileId)
);

fileRouter.get(
  '/files/:fileId/history-active',
  authMiddleware,
  (req, resp) => fileController.showFileHistoryActive(req, resp, req.params.fileId)
);

fileRouter.get(
  '/files/:fileId/history',
  authMiddleware,
  (req, resp) => fileController.showFileHistory(req, resp, req.params.fileId)
);

fileRouter.put(
  '/files/:fileId',
  authMiddleware,
  (req, resp) => fileController.changeFile(req, resp, req.params.fileId)
);

fileRouter.delete(
  '/files/:fileId',
  authMiddleware,
  (req, resp) => fileController.deleteFile(req, resp, req.params.fileId)
);

export default fileRouter;
