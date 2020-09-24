import { Request, Response } from 'express';

import { ProjectModel }  from '../models/projects/projects.schema';
import { FileModel }  from '../models/files/files.schema';

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await ProjectModel.create(req.body);

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
    const project = await ProjectModel.findById(projectId).orFail(Error);

    project.isActive = false;
    project.save();

    return res.json(project)
  } catch (error) {
    return res.status(404).json({ error: 'Project not found' })
  }
};

export const uploadFile = async (req: Request, resp: Response, projectId: string) => {
  const createdFile = { ...req.file };
  console.log('Teste'+createdFile);
}
