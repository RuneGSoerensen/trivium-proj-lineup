import express from 'express';
import { createRequest, getFeedRequests } from './controller.js';
import { requireAuth } from '../../middelware/auth.js';

const router = express.Router();

// Create a request
router.post('/', requireAuth, createRequest);

router.get('/feed', getFeedRequests);
export default router;
