import express from "express";
import { createFolder, getFolders, getFolderById, updateFolder, deleteFolder } from "../controllers/folderController.js";

const router = express.Router();

router.post("/", createFolder);
router.get("/", getFolders);
router.get("/:id", getFolderById);
router.put("/:id", updateFolder);
router.delete("/:id", deleteFolder);

export default router;