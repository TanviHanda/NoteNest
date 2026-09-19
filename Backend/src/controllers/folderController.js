import { db } from "../config/db.js";
import { folders } from "../db/schema/folder.js";
import { users } from "../db/schema/user.js";
import { eq } from "drizzle-orm";

export const createFolder = async (req, res) => {
  try {
    const { name, user_id } = req.body;

    const parsedUserId = Number(user_id);

    if (!name || !Number.isInteger(parsedUserId) || parsedUserId < 1) {
      return res.status(400).json({
        message: "A valid name and user_id are required",
      });
    }

    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, parsedUserId));

    if (!user) {
      return res.status(404).json({
        message: `User ${parsedUserId} does not exist`,
      });
    }

    const [folder] = await db
      .insert(folders)
      .values({
        name,
        user_id: parsedUserId,
      })
      .returning();

    res.status(201).json({
      message: "Folder created successfully",
      folder,
    });
  } catch (error) {
    console.error("Create folder error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getFolders = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({
        message: "user_id is required",
      });
    }

    const result = await db
      .select()
      .from(folders)
      .where(eq(folders.user_id, Number(user_id)));

    res.status(200).json({
      folders: result,
    });
  } catch (error) {
    console.error("Get folders error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getFolderById = async (req, res) => {
  try {
    const { id } = req.params;

    const [folder] = await db
      .select()
      .from(folders)
      .where(eq(folders.id, Number(id)));

    if (!folder) {
      return res.status(404).json({
        message: "Folder not found",
      });
    }

    res.status(200).json({
      folder,
    });
  } catch (error) {
    console.error("Get folder error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Folder name is required",
      });
    }

    const [updatedFolder] = await db
      .update(folders)
      .set({
        name,
      })
      .where(eq(folders.id, Number(id)))
      .returning();

    if (!updatedFolder) {
      return res.status(404).json({
        message: "Folder not found",
      });
    }

    res.status(200).json({
      message: "Folder updated successfully",
      folder: updatedFolder,
    });
  } catch (error) {
    console.error("Update folder error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;

    const [deletedFolder] = await db
      .delete(folders)
      .where(eq(folders.id, Number(id)))
      .returning();

    if (!deletedFolder) {
      return res.status(404).json({
        message: "Folder not found",
      });
    }

    res.status(200).json({
      message: "Folder deleted successfully",
    });
  } catch (error) {
    console.error("Delete folder error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};