import { db } from "../config/db.js";
import { notes } from "../db/schema/notes.js";
import { eq } from "drizzle-orm";

export const createNote = async (req, res) => {
  try {
    const { title, content, user_id, folder_id } = req.body;

    if (!title || !content || !user_id) {
      return res.status(400).json({
        message: "Title, content, and user_id are required",
      });
    }

    const [note] = await db
      .insert(notes)
      .values({
        title,
        content,
        user_id,
        folder_id,
      })
      .returning();

    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    console.error("Create note error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export const getNotes = async (req, res) => {
  try {
    const { user_id } = req.query
    if (!user_id) {
      return res.status(400).json({
        message: "user_id is required",
      });
    }

    const result = await db
      .select()
      .from(notes)
      .where(eq(notes.user_id, Number(user_id)));

    res.status(200).json({
      message: "Notes retrieved successfully",
      notes: result,
    });
  } catch (error) {
    console.error("Get notes error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const [note] = await db
      .select()
      .from(notes)
      .where(eq(notes.id, Number(id)));

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note retrieved successfully",
      note,
    });
  } catch (error) {
    console.error("Get note by ID error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, folder_id } = req.body;

    const [updatedNote] = await db
      .update(notes)
      .set({
        title,
        content,
        folder_id: folder_id || null,
        updated_at: new Date(),
      })
      .where(eq(notes.id, Number(id)))
      .returning();

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Update note error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await db
      .delete(notes)
      .where(eq(notes.id, Number(id)))
      .returning();

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Delete note error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}