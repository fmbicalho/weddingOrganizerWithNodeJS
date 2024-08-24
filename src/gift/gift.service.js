import {
  listGifts,
  getGift,
  createGift,
  updateGift,
  removeGift,
} from "./gift.dao.js";

export async function getGiftsList() {
  return listGifts();
}

export async function getGiftById(id) {
  return getGift(id);
}

export async function deposit(id, guestId, amount) {
  const gift = await getGift(id);

  if (!gift) {
    throw new Error("Gift not found");
  }

  if (gift.guest_id !== guestId) {
    throw new Error("Gift does not belong to guest");
  }

  gift.credit(amount);
  return updateGift(gift.id, gift);
}

export async function withdraw(id, guestId, amount) {
  const gift = await getGift(id);

  if (!gift) {
    throw new Error("Gift not found");
  }

  if (gift.guest_id !== guestId) {
    throw new Error("Gift does not belong to guest");
  }

  gift.debit(amount);
  return updateGift(gift.id, gift);
}
