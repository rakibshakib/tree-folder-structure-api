import { FolderTree } from "./folder.model";


async function findAndUpdateNodeById(rootNode: any, targetId: string, updateData: any): Promise<void> {
  if (rootNode._id.toString() === targetId) {
    // Update the node if it matches the target ID
    await FolderTree.updateOne({ _id: rootNode._id }, { $set: updateData });
    return;
  }

  for (const childNode of rootNode.child) {
    await findAndUpdateNodeById(childNode, targetId, updateData);
  }
}

async function findAndUpdateNode(targetId: string, updateData: any): Promise<void> {
  try {
    // Find the root node or starting point
    const rootKey = '652fac319b75a20d12c129a2'; // Replace with your criteria for finding the root node
    const rootNode = await FolderTree.findOne({ key: rootKey });

    if (!rootNode) {
      console.log('Root node not found.');
    } else {
      // Call the recursive function to find and update the node by its unique ID
      await findAndUpdateNodeById(rootNode, targetId, updateData);
      console.log('Node updated successfully.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to find and update the node by its unique ID
const targetId = '6530be95f124c3cbef213f15'; // Replace with the ID you want to update
const updateData = { "name" : "Rakib" };

findAndUpdateNode(targetId, updateData);
