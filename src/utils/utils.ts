import { Request, Response } from 'express';
import * as jwt from '../utils/jwt';

require('dotenv').config();

export const getCurrentUser = async (req: Request) => {

    const token = req.headers['auth'] as string;
    const { userId } = jwt.verify(token) as any;

    return userId;
};

export const fillCreatedBy = async (req: Request) => {
    const userId = getCurrentUser(req);
    req.body.createdById = userId;
    req.body.lastModifiedById = userId;
};

export const fillLastModifiedBy = async (req: Request) => {
    const userId = getCurrentUser(req);
    req.body.lastModifiedById = userId;
};
