import express from "express";
import { folderController } from "./folder.controller";

const router = express.Router();

router.get("/allFolders", folderController.getAllFolderNode);
router.post("/createFolder", folderController.createFolderNode);
router.post("/addChildFolder", folderController.addChildNodeinParentNodeById);

export default router;
