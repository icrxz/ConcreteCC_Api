import { Request, Response } from 'express';

import * as jwt from '../utils/jwt';
import { OrganizationModel }  from '../models/organizations/organizations.schema';

export const createOrganization = async (req: Request, res: Response) => {
  try {

    const token = req.headers['auth'] as string;
    const { userId } = jwt.verify(token) as any;

    const organization = await OrganizationModel.create(
      {
        ...req.body,
        createdById: userId,
        lastModifiedById: userId,
      });

    return res.status(200).json(organization)
  } catch (error) {
    return res.status(422).json({ message: error })
  }
};

export const indexOrganization = async (req: Request, res: Response) => {
  try {
    const organizations = await OrganizationModel.find({ isActive: true });

    return res.status(200).json(organizations)
  } catch (error) {
    return res.status(400).json({ message: error })
  }
};

export const showOrganization = async (req: Request, res: Response, organizationId: string) => {
  try {
    const organization = await OrganizationModel.findById(organizationId).orFail(Error);

    return res.status(200).json(organization)
  } catch (error) {
    return res.status(404).json({ message: error })
  }
};

export const deleteOrganization = async (req: Request, res: Response, organizationId: string) => {
  try {
    const token = req.headers['auth'] as string;
    const { userId } = jwt.verify(token) as any;

    const organization = await OrganizationModel.findById(organizationId).orFail(Error);

    organization.lastModifiedById = userId;
    organization.isActive = false;
    organization.save();

    return res.status(200).json(organization)
  } catch (error) {
    return res.status(404).json({ message: error })
  }
};
