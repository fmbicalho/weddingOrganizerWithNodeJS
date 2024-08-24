import { Router } from "express";
import { getFinances } from "./finance.controller.js";

const router = Router();

// Route to get all finances
router.get("/finances", getFinances);

export default router;
