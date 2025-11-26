import express from "express";
import { getGenres } from "../modules/genres/controller.js";

const router = express.Router();

router.get("/", getGenres);

export default router;
