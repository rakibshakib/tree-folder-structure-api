import express from "express";
import { folderController } from "./folder.controller";

const router = express.Router();

router.get("/allFolders", folderController.getAllFolderNode);
router.post("/createFolder", folderController.createFolderNode);
router.post("/updateNodeFolder", folderController.addChildNodeinParentNodeById);
router.post("/deleteNodeById", folderController.deleteNodeById);

export default router;
