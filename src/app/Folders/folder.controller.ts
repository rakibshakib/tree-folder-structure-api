import { Request, RequestHandler, Response } from "express";
import { FolderTree } from "./folder.model";
import { IfolderData } from "./folder.interface";

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
  res.status(200).json("created");
};

async function updateFolderById(
  rootNode: string,
  nodeId: string,
  newData: IfolderData
): Promise<IfolderData | null> {
  const root = await FolderTree.findById(rootNode);
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
      console.log("on update", node);
      return node;
    } else {
      node.child.forEach((childAsNode) => updateNode(childAsNode));
    }
    return node;
  };

  const updatedNode = await updateNode(root);
  console.log({ updatedNode });
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
  const newFolder = await updateFolderById(
    "653179d87dae277fc80a74a6",
    id,
    newChild
  );
  if (newFolder) {
    res.status(200).json(newChild);
  } else {
    res.status(200).json("failed");
  }
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
  const { id } = req.body;
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
