import express from 'express';
import { getUser, createUser, updateUser, addQuestion } from './controller.js';
import { requireAuth } from '../../middelware/auth.js';
const router = express.Router();

// POST /users
router.post('/create', createUser);
router.get('/:id', requireAuth, getUser);
router.patch('/:id', requireAuth, updateUser);
router.post('/:id/questions', requireAuth, addQuestion);
router;

export default router;
