import express from 'express';
import { getUser, createUser, updateUser, addQuestion } from './controller.js';
const router = express.Router();

// POST /users
router.post('/create', createUser);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.post('/:id/questions', addQuestion);
router;

export default router;
