import express from 'express';
import { getLookingForTags } from './controller.js';
import { requireAuth } from '../../middelware/auth.js';

const router = express.Router();

router.get('/', requireAuth, getLookingForTags);

export default router;
