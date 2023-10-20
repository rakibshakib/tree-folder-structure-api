import express from "express";
import { folderController } from "./folder.controller";

const router = express.Router();

router.get("/allFolders", folderController.getAllFolderNode);
router.post("/createFolder", folderController.createFolderNode);
router.post("/addChildFolder", folderController.addChildNodeinParentNodeById);
router.post("/updateNodeFolder", folderController.updateNodeFolder);
router.post("/deleteNodeById", folderController.deleteNodeById);

export default router;
