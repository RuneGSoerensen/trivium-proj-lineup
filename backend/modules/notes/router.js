import express from 'express';
import {
  getUserNotes,
  likeNote,
  commentNote,
  likeComment,
  createNote,
  getAllNoteTags,
  forYouNotes,
} from './controller.js';
import { requireAuth } from '../../middelware/auth.js';

const router = express.Router();

// Get all notes for a user
router.get('/user/:id', requireAuth, getUserNotes);

// Like a note
router.post('/:id/like', requireAuth, likeNote);

// Comment on note
router.post('/comment', requireAuth, commentNote);

// Like a comment
router.post('/comment/:id/like', requireAuth, likeComment);

// Create a note
router.post('/', requireAuth, createNote);

router.get('/tags', requireAuth, getAllNoteTags);

// Get notes for you
router.get('/for-you', requireAuth, forYouNotes);

export default router;
