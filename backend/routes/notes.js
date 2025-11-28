import express from "express";
import {
  getUserNotes,
  likeNote,
  commentNote,
  likeComment,
} from "../modules/notes/controller.js";

const router = express.Router();

// Get all notes for a user
router.get("/user/:id", getUserNotes);

// Like a note
router.post("/:id/like", likeNote);

// Comment on note
router.post("/comment", commentNote);

// Like a comment
router.post("/comment/:id/like", likeComment);

export default router;
