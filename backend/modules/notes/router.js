<<<<<<< Conflict 1 of 1
+++++++ Contents of side #1
import express from "express";
import {
  getUserNotes,
  likeNote,
  commentNote,
  likeComment,
  createNote
} from "./controller.js";

const router = express.Router();

// Get all notes for a user
router.get("/user/:id", getUserNotes);

// Like a note
router.post("/:id/like", likeNote);

// Comment on note
router.post("/comment", commentNote);

// Like a comment
router.post("/comment/:id/like", likeComment);

// Create a note
router.post("/", createNote);

export default router;
