import * as guestService from "./guest.service.js";

export async function getGuests(req, res) {
  const data = await guestService.listGuests();

  if (!data) {
    res.status(404).send("No guests found");
    return;
  }

  res.status(200);
  res.json(data);
}

export async function getGuest(req, res) {
  const data = await guestService.getGuestById(req.params.id);

  if (!data) {
    res.status(404).send("Guest not found");
    return;
  }

  res.status(200);
  res.json(data);
}

export async function addGuest(req, res) {
  if (!req.body) {
    res.status(400).send("Guest data is required");
    return;
  }

  const data = await guestService.addGuest(req.body);

  if (!data) {
    res.status(500).send("Error adding guest");
    return;
  }

  res.status(201);
  res.send(data);
}

export async function updateGuest(req, res) {
  if (!req.body) {
    res.status(400).send("Guest data is required");
    return;
  }

  const data = await guestService.updateGuest(req.body);

  if (!data) {
    res.status(500).send("Error updating guest");
    return;
  }

  res.status(200);
  res.send(data);
}

export async function deleteGuest(req, res) {
  if (!req.params.id) res.status(400).send("Guest ID is required");

  const deleted = guestService.deleteGuest(req.params.id);

  if (!deleted) {
    res.status(500).send("Error deleting guest");
    return;
  }

  res.status(200);
  res.send(deleted);
}
