import { IfolderData } from "./folder.interface";
import { FolderTree } from "./folder.model";

const getAllFolderNode = async (): Promise<IfolderData[] | []> => {
  const result = await FolderTree.find();
  return result;
};

const createFolderNode = async (
  payload: IfolderData
): Promise<IfolderData | []> => {
  const newFolderNode = await FolderTree.create(payload);
  return newFolderNode;
};

const addChildNodeinParentNodeById = async (
  rootNode: string,
  nodeId: string,
  newData: IfolderData
): Promise<IfolderData | null> => {
  const root = await FolderTree.findById(rootNode);
  if (!root) {
    return null; // Root node not found
  }
  const updateNode = async (node: IfolderData): Promise<IfolderData | null> => {
    if (node._id.toString() === nodeId) {
      node.child.push(newData); // Update the node with new data
      await root.save();
      return node;
    } else {
      node.child.forEach((childAsNode) => updateNode(childAsNode));
    }
    return node;
  };

  const result = await updateNode(root);
  return result;
};

const deleteNodeById = async (
  rootNode: string,
  nodeId: string
): Promise<IfolderData | boolean> => {
  const root = await FolderTree.findById(rootNode);
  if (!root) {
    return false;
  }
  const updateNode = async (node: IfolderData): Promise<boolean> => {
    for (let i = 0; i < node.child.length; i++) {
      if (node.child[i]._id.toString() === nodeId) {
        node.child.splice(i, 1); // Removeing child
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
};

export const FolderService = {
  getAllFolderNode,
  createFolderNode,
  addChildNodeinParentNodeById,
  deleteNodeById,
};
