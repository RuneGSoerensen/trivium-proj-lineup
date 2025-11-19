import express from "express";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

// POST /users
router.post("/create", createUser);

export default router;
