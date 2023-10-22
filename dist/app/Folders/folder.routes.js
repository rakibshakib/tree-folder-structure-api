"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const folder_controller_1 = require("./folder.controller");
const router = express_1.default.Router();
router.get("/allFolders", folder_controller_1.folderController.getAllFolderNode);
router.post("/createFolder", folder_controller_1.folderController.createFolderNode);
router.post("/updateNodeFolder", folder_controller_1.folderController.addChildNodeinParentNodeById);
router.post("/deleteNodeById", folder_controller_1.folderController.deleteNodeById);
exports.default = router;
