"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const folder_model_1 = require("./folder.model");
function findAndUpdateNodeById(rootNode, targetId, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (rootNode._id.toString() === targetId) {
            // Update the node if it matches the target ID
            yield folder_model_1.FolderTree.updateOne({ _id: rootNode._id }, { $set: updateData });
            return;
        }
        for (const childNode of rootNode.child) {
            yield findAndUpdateNodeById(childNode, targetId, updateData);
        }
    });
}
function findAndUpdateNode(targetId, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find the root node or starting point
            const rootKey = '652fac319b75a20d12c129a2'; // Replace with your criteria for finding the root node
            const rootNode = yield folder_model_1.FolderTree.findOne({ key: rootKey });
            if (!rootNode) {
                console.log('Root node not found.');
            }
            else {
                // Call the recursive function to find and update the node by its unique ID
                yield findAndUpdateNodeById(rootNode, targetId, updateData);
                console.log('Node updated successfully.');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
// Call the function to find and update the node by its unique ID
const targetId = '6530be95f124c3cbef213f15'; // Replace with the ID you want to update
const updateData = { "name": "Rakib" };
findAndUpdateNode(targetId, updateData);
