import express from 'express';
import { follow, unfollow, getStats, checkFollowing } from './controller.js';
import { requireAuth } from '../../middelware/auth.js';

const router = express.Router();

// Follow user
router.post('/follow/:profileId', requireAuth, follow);

// Unfollow user
router.delete('/unfollow/:profileId', requireAuth, unfollow);

// Stats: followers + following count
router.get('/:id/stats', requireAuth, getStats);

// Check follow status
router.get('/:followerId/following/:profileId', requireAuth, checkFollowing);

export default router;
