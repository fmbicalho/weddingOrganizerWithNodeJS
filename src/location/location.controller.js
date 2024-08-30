import * as locationService from "./location.service.js";

export async function getLocations(req, res) {
  const data = await locationService.listLocations();

  if (!data) {
    res.status(404).send("No locations found");
    return;
  }

  res.status(200);
  res.json(data);
}

export async function getLocation(req, res) {
  const data = await locationService.getLocationById(req.params.id);

  if (!data) {
    res.status(404).send("Location not found");
    return;
  }

  res.status(200);
  res.json(data);
}

export async function addLocation(req, res) {
  if (!req.body) {
    res.status(400).send("Location data is required");
    return;
  }

  const data = await locationService.addLocation(req.body);

  if (!data) {
    res.status(500).send("Error adding location");
    return;
  }

  res.status(201);
  res.send(data);
}

export async function updateLocation(req, res) {
  if (!req.body) {
    res.status(400).send("Location data is required");
    return;
  }

  const data = await locationService.updateLocation(req.body);

  if (!data) {
    res.status(500).send("Error updating location");
    return;
  }

  res.status(200);
  res.send(data);
}

export async function deleteLocation(req, res) {
  if (!req.params.id) res.status(400).send("Location ID is required");

  const deleted = locationService.deleteLocation(req.params.id);

  if (!deleted) {
    res.status(500).send("Error deleting location");
    return;
  }

  res.status(200);
  res.send(deleted);
}
