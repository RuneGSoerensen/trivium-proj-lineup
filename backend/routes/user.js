import express from "express";
import { createUser } from "../modules/user/controller.js";
import { getUserData } from "../modules/user/controller.js";

const router = express.Router();

// POST /users
router.post("/create", createUser);
router.get("/:id", getUserData);
export default router;
