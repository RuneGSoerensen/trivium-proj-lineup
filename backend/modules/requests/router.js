import express from 'express';
import { createRequest, getAllRequests, getRequestById } from './controller.js';
import { requireAuth } from '../../middelware/auth.js';

const router = express.Router();

// Create a request
router.post('/', requireAuth, createRequest);
router.get('/', getAllRequests);
router.get('/:id', getRequestById);

router.get('/feed', getFeedRequests);
export default router;
