import express from "express";
import { search } from "./controller.js";

const router = express.Router();

router.get('/results', search);

export default router;