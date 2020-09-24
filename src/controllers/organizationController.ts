import { Request, Response } from 'express';

import * as jwt from '../utils/jwt';
import * as utils from '../utils/utils';
import { OrganizationModel }  from '../models/organizations/organizations.schema';

export const createOrganization = async (req: Request, res: Response) => {
  try {

    utils.fillCreatedBy(req);

    const organization = await OrganizationModel.create(req.body);

    return res.json(organization)
  } catch (error) {
    return res.status(422).json({ error: 'Registration failed' })
  }
};

export const indexOrganization = async (req: Request, res: Response) => {
  try {
    const organizations = await OrganizationModel.find({ isActive: true });

    return res.json(organizations)
  } catch (error) {
    return res.status(400).json({ error: 'Dont have records' })
  }
};

export const showOrganization = async (req: Request, res: Response, organizationId: string) => {
  try {
    const organization = await OrganizationModel.findById(organizationId).orFail(Error);

    return res.json(organization)
  } catch (error) {
    return res.status(404).json({ error: 'Organization not found' })
  }
};

export const deleteOrganization = async (req: Request, res: Response, organizationId: string) => {
  try {
    utils.fillLastModifiedBy(req);
    
    const organization = await OrganizationModel.findById(organizationId).orFail(Error);

    organization.isActive = false;
    organization.save();

    return res.json(organization)
  } catch (error) {
    return res.status(404).json({ error: 'Organization not found' })
  }
};
