import { Request, RequestHandler, Response } from "express";
import { FolderTree } from "./folder.model";

const getAllFolderNode: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const allFolderTree = await FolderTree.find();
  console.log(allFolderTree);
  res.status(200).json(allFolderTree[0]);
};

const createFolderNode: RequestHandler = async (
  req: Request,
  res: Response
) => {
  console.log(req.body);
  const payload = {
    ...req.body,
    key: Date.now(),
  };
  const newFolderNode = await FolderTree.create(payload);
  console.log(newFolderNode);
  // res.status(201).json(newFolderNode);
  res.status(200).json("created");
};

export const folderController = {
  getAllFolderNode,
  createFolderNode,
};
