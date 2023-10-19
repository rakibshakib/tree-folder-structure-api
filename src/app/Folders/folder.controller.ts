import { Request, RequestHandler, Response } from "express";
import { FolderTree } from "./folder.model";
import { FolderModel, IfolderData } from "./folder.interface";
import mongoose from "mongoose";

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

const addChildNodeinParentNodeById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id, name } = req.body;
  const newChild = new FolderTree({
    name: name,
    isOpne: false,
    child: [],
    key: Date.now(),
  });

  const aggregationPipeline = [
    {
      $match: {
        _id: id, // Replace with the root node's _id
      },
    },
    // {
    //   $graphLookup: {
    //     from: "foldertrees",
    //     startWith: "$child",
    //     connectFromField: "child",
    //     connectToField: "_id",
    //     as: "foundNode",
    //     maxDepth: 10,
    //   },
    // },
    // {
    //   $unwind: "$foundNode",
    // },
    // {
    //   $match: {
    //     "foundNode._id": "652fac319b75a20d12c129a2",
    //   },
    // },
  ];

  // const node = await FolderTree.aggregate(aggregationPipeline);
  // console.log({ node });

  const parentId = "652fac319b75a20d12c129a2";
  const parentNode = await FolderTree.findById({ _id: parentId });
  // console.log({ parentNode });
  if (parentNode?.name === "Root" && parentNode._id === id) {
    parentNode?.child.push(newChild);
    await parentNode?.save();
  } else {
    const updateNode = (child) => {
      const index = child?.child.forEach((i) => i._id === id);
      console.log(index)
      // if (index === -1) {
      //   child?.child?.forEach(updateNode);
      // } else {
      //   child?.child?.[index].child?.push(newChild);
      // }
    };
    updateNode(parentNode)
    // const updateNode = (child: IfolderData) => {
    //   const index = child?.child.findIndex((i) => i.id === id);
    //   if (index === -1) {
    //     child.child.forEach(updateNode);
    //   } else {
    //     (child?.child[index].child as TreeNode[]).push(newObject);
    //   }
    // };

    res.status(200).json("updated");

    // updateNode(updatedData);
  }

  res.status(200).json("created");
};

export const folderController = {
  getAllFolderNode,
  createFolderNode,
  addChildNodeinParentNodeById,
};
