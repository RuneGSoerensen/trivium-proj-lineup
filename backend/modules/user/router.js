import express from 'express';
import { getUser, createUser, updateUser } from './controller.js';
const router = express.Router();

// POST /users
router.post('/create', createUser);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router;

export default router;
