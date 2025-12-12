import express from 'express';
import { search } from './controller.js';
import { requireAuth } from '../../middelware/auth.js';

const router = express.Router();

router.get('/results', requireAuth, search);

export default router;

