import express from "express";
import { createRequest } from "./controller.js";

const router = express.Router();

// Create a request
router.post("/", createRequest);

export default router;
