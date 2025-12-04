import express from 'express';
import { getThreads, getThreadMessages, createMessage, createThread } from './controller.js';
const router = express.Router();

router.get('/threads', getThreads);

router.post('/threads', createThread);

router.get('/threads/:threadId/messages', getThreadMessages);

router.post('/threads/:threadId/messages', createMessage);

export default router;
