import express from 'express';
import { createRequest, getAllRequests, getRequestById, getFeedRequests } from './controller.js';
import { requireAuth } from '../../middelware/auth.js';

const router = express.Router();

// Create a request
router.post('/', requireAuth, createRequest);
router.get('/', getAllRequests);
// Feed is a static route and must be registered before the param route
// otherwise `/feed` will be captured by `/:id` and treated as the id.
router.get('/feed', requireAuth, getFeedRequests);

router.get('/:id', getRequestById);
export default router;
