import express from "express";
import { getLookingForTags } from "../modules/looking_for/controller.js";

const router = express.Router();

router.get("/", getLookingForTags);

export default router;
