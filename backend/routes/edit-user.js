import express from "express";
import { editUser } from "../modules/edit-user/controller.js";
const router = express.Router();

// POST /users
router.patch("/edit", editUser);
export default router;
