import { Request, Response } from 'express';

import { ProjectModel } from '../models/projects/projects.schema';
import { ProjectUserModel } from '../models/projectuser/projectusers.schema';
import { FileModel } from '../models/files/files.schema';
import { OrganizationModel } from '../models/organizations/organizations.schema';
import { uploadFileService } from '../services/uploadService';

import * as jwt from '../utils/jwt';

export const createProject = async (req: Request, res: Response) => {
  try {
    const token = req.headers['auth'] as string;
    const { userId } = jwt.verify(token) as any;
    const project = await ProjectModel.create(
      {
        ...req.body,
        manager: userId,
        createdById: userId,
        lastModifiedById: userId,
      });

    return res.status(200).json(project)
  } catch (error) {
    return res.status(422).json({ message: error })
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

    return res.status(200).json(project)
  } catch (error) {
    return res.status(422).json({ message: error })
  }
};

export const indexProject = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectModel.find({ isActive: true });

    return res.status(200).json(projects)
  } catch (error) {
    return res.status(400).json({ message: error })
  }
};

export const showProject = async (req: Request, res: Response, projectId: string) => {
  try {
    const project = await ProjectModel.findById(projectId).orFail(Error);

    return res.status(200).json(project)
  } catch (error) {
    return res.status(404).json({ message: error })
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

    return res.status(200).json(project)
  } catch (error) {
    return res.status(404).json({ message: error })
  }
};

export const showFileProject = async (req: Request, res: Response, projectId: string) => {
  try {
    const files = await FileModel.find({ isActive: true, project: projectId });

    return res.json(files)
  } catch (error) {
    return res.status(404).json({ message: error })
  }
};

export const listMembers = async (req: Request, res: Response, projectId: string) => {
  try {
    const files = await ProjectUserModel.find({ project: projectId });

    return res.json(files)
  } catch (error) {
    return res.status(404).json({ message: error })
  }
};

export const addMember = async (req: Request, res: Response, projectId: string) => {
  try {
    const token = req.headers['auth'] as string;
    const { userId } = jwt.verify(token) as any;

    const { userRelatedId, name } = req.body;


    const project = await ProjectUserModel.create(
      {
        name: name,
        user: userRelatedId,
        project: projectId,
        createdById: userId,
        lastModifiedById: userId,
      });

    return res.status(200).json(project)
  } catch (error) {
    return res.status(404).json({ message: error })
  }
};

export const removeMember = async (req: Request, res: Response, projectId: string, userId: string) => {
  try {

    const projectUser = await ProjectUserModel.findOne({ project: projectId, user : userId }).orFail(Error);

    const files = await ProjectUserModel.findByIdAndDelete(projectUser.id);

    return res.status(200).json({message: 'Registro deletado com Sucesso'})
  } catch (error) {
    return res.status(404).json({ message: error })
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

    res.status(200).json(_file);
  } catch(error) {
    return res.status(404).json({ message: error })
  }
}
