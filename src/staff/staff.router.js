import { Router } from "express";
import { getStaff, getOneStaff } from "./staff.controller.js";

const router = Router();

// Route to get all gifts
router.get("/staff", getStaff);

// Route to get a single gift by ID
router.get("/staff/:id", getOneStaff);

export default router;
