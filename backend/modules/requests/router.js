import express from 'express';
import { createRequest, getAllRequests, getRequestById, getFeedRequests } from './controller.js';
import { requireAuth } from '../../middelware/auth.js';

const router = express.Router();

// Create a request
router.post('/', requireAuth, createRequest);
router.get('/', requireAuth, getAllRequests);
router.get('/feed', requireAuth, getFeedRequests);
router.get('/:id', requireAuth, getRequestById);
export default router;
