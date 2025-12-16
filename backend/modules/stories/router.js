import express from 'express';
import { getStories } from './controller.js';
import { requireAuth } from '../../middelware/auth.js';

const router = express.Router();

router.get('/', requireAuth, getStories);

export default router;
