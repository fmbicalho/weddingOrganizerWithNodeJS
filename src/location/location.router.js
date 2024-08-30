import { Router } from "express";
import {
  getLocations,
  getLocation,
  addLocation,
  updateLocation,
  deleteLocation,
} from "./location.controller.js";

const router = Router();

// Route to get all locations
router.get("/locations", getLocations);

// Route to get a single location by ID
router.get("/locations/:id", getLocation);

// Route to add a new location
router.post("/locations", addLocation);

// Route to update an existing location
router.put("/locations/:id", updateLocation);

// Route to delete a location
router.delete("/locations/:id", deleteLocation);

export default router;
