import { Request, Response } from 'express';

import { ProjectModel } from '../models/projects/projects.schema';
import { FileModel } from '../models/files/files.schema';
import { OrganizationModel } from '../models/organizations/organizations.schema';
import { uploadFileService } from '../services/uploadService';


import * as jwt from '../utils/jwt';

export const createProject = async (req: Request, res: Response) => {
  try {
    const token = req.headers['auth'] as string;
    const { userId } = jwt.verify(token) as any;
    const project = await ProjectModel.create(req.body);

    project.createdById = userId;
    project.save();

    return res.json(project)
  } catch (error) {
    return res.status(422).json({ teste: error })
  }
};

export const changeOrganization = async (req: Request, res: Response, projectId: string) => {
  try {
    const token = req.headers['auth'] as string;
    const { userId } = jwt.verify(token) as any;

    const project = await ProjectModel.findById(projectId).orFail(Error);
    const { organization } = req.body;
    const organizationRelated = await OrganizationModel.findById(organization).orFail(Error);

    project.organization = organizationRelated.id;
    project.lastModifiedById = userId;
    project.save();

    return res.json(project)
  } catch (error) {
    return res.status(422).json({ error: 'Registration failed' })
  }
};

export const indexProject = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectModel.find({ isActive: true });

    return res.json(projects)
  } catch (error) {
    return res.status(400).json({ error: 'Dont have records' })
  }
};

export const showProject = async (req: Request, res: Response, projectId: string) => {
  try {
    const project = await ProjectModel.findById(projectId).orFail(Error);

    return res.json(project)
  } catch (error) {
    return res.status(404).json({ error: 'Project not found' })
  }
};

export const deleteProject = async (req: Request, res: Response, projectId: string) => {
  try {

    const token = req.headers['auth'] as string;
    const { userId } = jwt.verify(token) as any;

    const project = await ProjectModel.findById(projectId).orFail(Error);
    project.lastModifiedById = userId;
    project.isActive = false;
    project.save();

    return res.json(project)
  } catch (error) {
    return res.status(404).json({ error: 'Project not found' })
  }
};

export const showFileProject = async (req: Request, res: Response, projectId: string) => {
  try {
    const files = await FileModel.find({ isActive: true, project: projectId });

    return res.json(files)
  } catch (error) {
    return res.status(404).json({ error: 'File not found' })
  }
};

export const uploadFile = async (req: Request, res: Response, projectId: string) => {
  try {
    const uploadedFile = {
      ...req.file,
      desc: req.body.desc as string
    };
    const token = req.headers['auth'] as string;
    const { userId } = jwt.verify(token) as any;

    const _file = await uploadFileService(userId, projectId, uploadedFile);

    ProjectModel.findByIdAndUpdate(
      projectId,
      {
        $push: { files: _file.id },
        lastModifiedById: userId,
      },
    )
  } catch(error) {
    return res.status(404).json({ error: 'Project not found' })
  }
}