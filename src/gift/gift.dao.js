import Gift from "./gift.js";

export async function listGifts() {
  return await Gift.query().select("id", "gift_type", "amount", "guest_id");
}

export async function getGift(id) {
  return await Gift.query().findById(id);
}

export async function createGift(gift) {
  return await Gift.query().insert(gift);
}

export async function updateGift(id, updatedGift) {
  return await Gift.query().findById(id).patch(updatedGift);
}

export async function removeGift(id) {
  return await Gift.query().deleteById(id);
}
