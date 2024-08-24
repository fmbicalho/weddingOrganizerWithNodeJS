import { Router } from "express";
import { getGifts, getGift } from "./gift.controller.js";

const router = Router();

// Route to get all gifts
router.get("/gifts", getGifts);

// Route to get a single gift by ID
router.get("/gifts/:id", getGift);

export default router;
