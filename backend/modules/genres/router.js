import express from 'express';
import { getGenres } from './controller.js';
import { requireAuth } from '../../middelware/auth.js';

const router = express.Router();

router.get('/', requireAuth, getGenres);

export default router;
