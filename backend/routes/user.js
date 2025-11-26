import express from "express";
import { getUser } from "../modules/user/controller.js";
import { createUser } from "../modules/user/controller.js";

const router = express.Router();

// POST /users
router.post("/create", createUser);
router.get("/:id", getUser);

export default router;
