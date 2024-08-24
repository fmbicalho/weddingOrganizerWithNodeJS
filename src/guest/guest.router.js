import { Router } from "express";
import {
  getGuests,
  getGuest,
  addGuest,
  updateGuest,
  deleteGuest,
} from "./guest.controller.js";

const router = Router();

// Route to get all guests
router.get("/guests", getGuests);

// Route to get a single guest by ID
router.get("/guests/:id", getGuest);

// Route to add a new guest
router.post("/guests", addGuest);

// Route to update an existing guest
router.put("/guests/:id", updateGuest);

// Route to delete a guest
router.delete("/guests/:id", deleteGuest);

export default router;
