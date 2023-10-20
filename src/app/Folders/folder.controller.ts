import { Request, RequestHandler, Response } from "express";
import { FolderTree } from "./folder.model";
import { FolderModel, IfolderData } from "./folder.interface";
import mongoose from "mongoose";

const getAllFolderNode: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const allFolderTree = await FolderTree.find();
  // console.log(allFolderTree);
  res.status(200).json(allFolderTree[0]);
};

const createFolderNode: RequestHandler = async (
  req: Request,
  res: Response
) => {
  console.log(req.body);
  const payload = {
    ...req.body,
    isOpen: false,
    child: [],
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
    isOpen: false,
    child: [],
    key: Date.now(),
  });
  const parentNode = await FolderTree.findById({ _id: id });
  parentNode?.child.push(newChild);
  await parentNode?.save();

  // const aggregationPipeline = [
  //   {
  //     $match: {
  //       _id: id, // Replace with the root node's _id
  //     },
  //   },
  //   // {
  //   //   $graphLookup: {
  //   //     from: "foldertrees",
  //   //     startWith: "$child",
  //   //     connectFromField: "child",
  //   //     connectToField: "_id",
  //   //     as: "foundNode",
  //   //     maxDepth: 10,
  //   //   },
  //   // },
  //   // {
  //   //   $unwind: "$foundNode",
  //   // },
  //   // {
  //   //   $match: {
  //   //     "foundNode._id": "652fac319b75a20d12c129a2",
  //   //   },
  //   // },
  // ];

  // // const node = await FolderTree.aggregate(aggregationPipeline);
  // // console.log({ node });

  // const parentId = "652fac319b75a20d12c129a2";
  // const parentNode = await FolderTree.findById({ _id: parentId });
  // // console.log({ parentNode });
  // if (parentNode?.name === "Root" && parentNode._id === id) {
  //   parentNode?.child.push(newChild);
  //   await parentNode?.save();
  // } else {
  //   const updateNode = (child) => {
  //     const index = child?.child.forEach((i) => i._id === id);
  //     console.log(index)
  //     // if (index === -1) {
  //     //   child?.child?.forEach(updateNode);
  //     // } else {
  //     //   child?.child?.[index].child?.push(newChild);
  //     // }
  //   };
  //   updateNode(parentNode)
  //   // const updateNode = (child: IfolderData) => {
  //   //   const index = child?.child.findIndex((i) => i.id === id);
  //   //   if (index === -1) {
  //   //     child.child.forEach(updateNode);
  //   //   } else {
  //   //     (child?.child[index].child as TreeNode[]).push(newObject);
  //   //   }
  //   // };

  //   res.status(200).json("updated");

  // updateNode(updatedData);
  // }

  res.status(200).json("created");
};

async function updateFolderById(
  rootNode: string,
  nodeId: string,
  newData: IfolderData
): Promise<IfolderData | null> {
  console.log(newData, "new data need to push");
  const root = await FolderTree.findById(rootNode);
  console.log(root);
  if (!root) {
    return null; // Root node not found
  }

  const updateNode = async (node: IfolderData): Promise<IfolderData | null> => {
    if (node._id.toString() === nodeId) {
      // Update the node with new data
      node.child.push(newData); // For example, you can add new data here
      // await node.save();
      // root.deleteOne()
      await root.save();
      return node;
    } else {
      // for (let i = 0; i < node.child.length; i++) {
      //   const updatedChild = await updateNode(node.child[i]);
      //   if (updatedChild) return updatedChild;
      // }
      node.child.forEach((childAsNode) => updateNode(childAsNode));
    }
    return null;
  };

  const updatedNode = await updateNode(root);
  return updatedNode;
}

const updateNodeFolder: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id, name } = req.body;
  const newChild = new FolderTree({
    name: name,
    isOpen: false,
    child: [],
    key: Date.now(),
  });
  updateFolderById("653179d87dae277fc80a74a6", id, newChild)
    .then((updatedNode) => {
      if (updatedNode) {
        console.log("Node updated:", updatedNode);
        // await updatedNode?.save();
      } else {
        console.log("Node not found or could not be updated.");
      }
    })
    .catch((error) => {
      console.error("Error updating node:", error);
    });
  res.status(200).json("created");
};

async function DeleteFolderById(
  rootNode: string,
  nodeId: string
): Promise<IfolderData | boolean> {

  const root = await FolderTree.findById(rootNode);
  if (!root) {
    return false; // Root node not found
  }
  const updateNode = async (node: IfolderData): Promise<boolean> => {
    for (let i = 0; i < node.child.length; i++) {
      if (node.child[i]._id.toString() === nodeId) {
        // Remove the child node by ID
        node.child.splice(i, 1);
        await root.save();
        return true;
      } else if (await updateNode(node.child[i])) {
        return true;
      }
    }
    return false;
  };



  const deleted = await updateNode(root);
  return deleted;
}
const deleteNodeById: RequestHandler = async (req: Request, res: Response) => {
  const { id, name } = req.body;
  DeleteFolderById("653179d87dae277fc80a74a6", id)
    .then((deletedNode) => {
      if (deletedNode) {
        console.log("Node deletedNode:", deletedNode);
        // await updatedNode?.save();
      } else {
        console.log("Node not found or could not be deletedNode.");
      }
    })
    .catch((error) => {
      console.error("Error updating node:", error);
    });
  // const deleted = await FolderTree.findByIdAndRemove(id).exec();
  // console.log({ deleted });
  // if (deleted) {
  //   res.status(200).json("deleted");
  // } else {
  //   res.status(200).json("failed");
  // }
  res.status(200).json("deleted");
};

export const folderController = {
  getAllFolderNode,
  createFolderNode,
  addChildNodeinParentNodeById,
  updateNodeFolder,
  deleteNodeById,
};
