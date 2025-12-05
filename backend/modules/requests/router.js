import express from 'express';
import { createRequest, getAllRequests } from './controller.js';
import { requireAuth } from '../../middelware/auth.js';

const router = express.Router();

// Create a request
router.post('/', requireAuth, createRequest);

router.get('/getAll', getAllRequests);

export default router;
