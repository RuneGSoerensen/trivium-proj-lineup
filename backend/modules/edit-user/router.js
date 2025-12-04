import express from 'express';
import { editUser, editGenres } from './controller.js';

const router = express.Router();

// PATCH /edit/:id -> update user data
router.patch('/:id', editUser);

// PATCH /edit/:id/genres -> update user's genres (create missing genres and update relations)
router.patch('/:id/genres', editGenres);

export default router;
