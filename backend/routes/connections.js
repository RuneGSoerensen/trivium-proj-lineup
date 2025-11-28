import express from "express";
import {
  follow,
  unfollow,
  getStats,
  checkFollowing,
} from "../modules/connections/controller.js";

const router = express.Router();

// Follow user
router.post("/follow", follow);

// Unfollow user
router.delete("/unfollow", unfollow);

// Stats: followers + following count
router.get("/:id/stats", getStats);

// Check follow status
router.get("/:followerId/following/:profileId", checkFollowing);

export default router;
