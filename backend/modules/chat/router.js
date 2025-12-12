import express from 'express';
import { getThreads, getThreadMessages, createMessage, createThread } from './controller.js';
import { requireAuth } from '../../middelware/auth.js';
const router = express.Router();

router.get('/threads', requireAuth, getThreads);

router.post('/threads', requireAuth, createThread);

router.get('/threads/:threadId/messages', requireAuth, getThreadMessages);

router.post('/threads/:threadId/messages', requireAuth, createMessage);

export default router;
