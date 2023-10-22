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
exports.FolderService = void 0;
const folder_model_1 = require("./folder.model");
const getAllFolderNode = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield folder_model_1.FolderTree.find();
    return result;
});
const createFolderNode = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newFolderNode = yield folder_model_1.FolderTree.create(payload);
    return newFolderNode;
});
const addChildNodeinParentNodeById = (rootNode, nodeId, newData) => __awaiter(void 0, void 0, void 0, function* () {
    const root = yield folder_model_1.FolderTree.findById(rootNode);
    if (!root) {
        return null; // Root node not found
    }
    const updateNode = (node) => __awaiter(void 0, void 0, void 0, function* () {
        if (node._id.toString() === nodeId) {
            node.child.push(newData); // Update the node with new data
            yield root.save();
            return node;
        }
        else {
            node.child.forEach((childAsNode) => updateNode(childAsNode));
        }
        return node;
    });
    const result = yield updateNode(root);
    return result;
});
const deleteNodeById = (rootNode, nodeId) => __awaiter(void 0, void 0, void 0, function* () {
    const root = yield folder_model_1.FolderTree.findById(rootNode);
    if (!root) {
        return false;
    }
    const updateNode = (node) => __awaiter(void 0, void 0, void 0, function* () {
        for (let i = 0; i < node.child.length; i++) {
            if (node.child[i]._id.toString() === nodeId) {
                node.child.splice(i, 1); // Removeing child
                yield root.save();
                return true;
            }
            else if (yield updateNode(node.child[i])) {
                return true;
            }
        }
        return false;
    });
    const deleted = yield updateNode(root);
    return deleted;
});
exports.FolderService = {
    getAllFolderNode,
    createFolderNode,
    addChildNodeinParentNodeById,
    deleteNodeById,
};
