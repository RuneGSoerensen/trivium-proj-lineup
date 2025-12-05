import express from 'express';
import { getLookingForTags } from './controller.js';

const router = express.Router();

router.get('/', getLookingForTags);

export default router;
