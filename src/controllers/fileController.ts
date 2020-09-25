import { Request, Response } from 'express';

import * as jwt from '../utils/jwt';
import { FileModel } from '../models/files/files.schema';
import { HistoryModel } from '../models/history/history.schema';
import { ProjectModel } from '../models/projects/projects.schema';
import { changeUploadedFileService } from '../services/uploadService';

export const indexFile = async (req: Request, res: Response) => {
    try {
        const allFile = await FileModel.find({ isActive: true });

        return res.json(allFile)
    } catch (error) {
        return res.status(400).json({ error: 'Dont have records' })
    }
};

export const showFile = async (req: Request, res: Response, fileId: string) => {
    try {
        const file = await FileModel.findById(fileId).orFail(Error);

        return res.json(file)
    } catch (error) {
        return res.status(404).json({ error: 'File not found' })
    }
};

export const showFileHistory = async (req: Request, res: Response, fileId: string) => {
    try {
        const fileHistory = await HistoryModel.find({file: fileId });

        return res.json(fileHistory)
    } catch (error) {
        return res.status(404).json({ error: 'File History not found' })
    }
};

export const showFileHistoryActive = async (req: Request, res: Response, fileId: string) => {
    try {
        const fileHistory = await HistoryModel.find({ isActive: true, file: fileId });

        return res.json(fileHistory)
    } catch (error) {
        return res.status(404).json({ error: 'File History not found' })
    }
};

export const deleteFile = async (req: Request, res: Response, fileId: string) => {
    try {
        const token = req.headers['auth'] as string;
        const { userId } = jwt.verify(token) as any;

        const fileConst = await FileModel.findByIdAndUpdate(
            fileId,
            {
                isActive : false,
                lastModifiedById: userId,
            },
        ).orFail(Error);

        const lastfileHistoryId = fileConst.fileHistories.reverse()[0];
        await HistoryModel.findByIdAndUpdate(
            lastfileHistoryId,
            { isActive: false, lastModifiedById:  userId }
        )

        return res.json(fileConst)
    } catch (error) {
        return res.status(404).json({ error: 'File History not found' })
    }
};


export const changeFile = async (req: Request, res: Response, fileId: string) => {
    try {
        const uploadedFile = {
            ...req.file,
            desc: req.body.desc as string
        };
        const token = req.headers['auth'] as string;
        const { userId } = jwt.verify(token) as any;

        const _file = await changeUploadedFileService(userId, fileId, uploadedFile);

        res.status(200).json(_file);

    } catch (error) {
        return res.status(404).json({ message: error })
    }
};

