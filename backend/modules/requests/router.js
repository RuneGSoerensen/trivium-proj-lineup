import express from "express";
import { createRequest } from "./controller.js";
import { requireAuth } from "../../middelware/auth.js";

const router = express.Router();

// Create a request
router.post("/", requireAuth, createRequest);

export default router;
