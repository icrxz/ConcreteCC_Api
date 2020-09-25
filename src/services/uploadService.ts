import { FileModel } from '../models/files/files.schema';
import { IFile } from '../models/files/files.types';
import { HistoryModel } from '../models/history/history.schema';
import { IHistory } from '../models/history/history.types';

export const uploadFileService = async (userId: string, projectId: string, file: any) => {
  const createdFile = await FileModel.create({
    name: file.filename,
    fileType: file.mimetype,
    description: file.desc,
    project: projectId,
    lastModifiedById: userId,
    createdById: userId,
  } as IFile);

  const createdHistory = await HistoryModel.create({
    externalURL: file.location,
    lastModifiedById: userId,
    createdById: userId,
    file: createdFile.id,
  } as IHistory);

  await FileModel.findByIdAndUpdate(
    createdFile.id,
    { $push: { fileHistories: createdHistory.id } }
  );

  return createdFile;
};

export const changeUploadedFileService = async (userId: string, fileId: string, file: any) => {
  const changedFile = await FileModel.findByIdAndUpdate(
    fileId,
    {
      name: file.originalname,
      description: file.desc,
      lastModifiedById: userId,
    }
  ).orFail(Error);

  const lastfileHistoryId = changedFile.fileHistories[-1];
  HistoryModel.findByIdAndUpdate(
    lastfileHistoryId,
    { isActive: false }
  );

  const createdHistory = await HistoryModel.create({
    externalURL: file.location,
    lastModifiedById: userId,
    createdById: userId,
    file: changedFile.id,
  } as IHistory);

  await FileModel.findByIdAndUpdate(
    changedFile.id,
    { $push: { fileHistories: createdHistory.id } }
  );

  return changedFile;
};