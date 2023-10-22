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
exports.folderController = void 0;
const folder_model_1 = require("./folder.model");
const folder_service_1 = require("./folder.service");
const getAllFolderNode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allFolderTree = yield folder_service_1.FolderService.getAllFolderNode();
    res.status(200).json(allFolderTree[0]);
});
const createFolderNode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = Object.assign(Object.assign({}, req.body), { isOpen: false, child: [], key: Date.now() });
    const newFolderNode = yield folder_service_1.FolderService.createFolderNode(payload);
    if (newFolderNode) {
        res.status(200).json("created");
    }
    else {
        res.status(200).json("Failed");
    }
});
const addChildNodeinParentNodeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    const newChild = new folder_model_1.FolderTree({
        name: name,
        isOpen: false,
        child: [],
        key: Date.now(),
    });
    // localDB root id: 653179d87dae277fc80a74a6
    const newFolder = yield folder_service_1.FolderService.addChildNodeinParentNodeById("6534118b68afc9c9ec415ecc", // host root id 
    id, newChild);
    if (newFolder) {
        res.status(200).json(newChild);
    }
    else {
        res.status(200).json("failed");
    }
});
const deleteNodeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    // localDB root id: 653179d87dae277fc80a74a6
    if (id === "6534118b68afc9c9ec415ecc") { // host root id 
        return res.status(200).json("root can't be deleted");
    }
    const result = yield folder_service_1.FolderService.deleteNodeById("6534118b68afc9c9ec415ecc", id);
    if (result) {
        res.status(200).json("Deleted");
    }
    else {
        res.status(200).json("failed");
    }
});
exports.folderController = {
    getAllFolderNode,
    createFolderNode,
    addChildNodeinParentNodeById,
    deleteNodeById,
};
