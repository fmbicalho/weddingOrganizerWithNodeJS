import { transaction } from "objection";
import { findAll, findById, saveOrUpdate, remove } from "./guest.dao.js";
import Guest from "./guest.js";

export async function listGuests() {
  return findAll();
}

export async function getGuestById(id) {
  return findById(id);
}

export async function getBalance(id) {
  const guest = await findById(id);

  if (!guest) {
    throw new Error("Guest not found");
  }

  return guest.gifts.reduce((acc, gift) => acc + gift.balance, 0);
}

export async function addGuest(guest) {
  return transaction(Guest.knex(), async (trx) => {
    try {
      return saveOrUpdate(guest).transacting(trx);
    } catch (error) {
      trx.rollback();
      throw error;
    }
  });
}

export async function updateGuest(guest) {
  return transaction(Guest.knex(), async (trx) => {
    try {
      const guestToUpdate = await findById(guest.id);

      if (!guestToUpdate) {
        throw new Error("Guest not found");
      }

      const data = {
        ...guestToUpdate,
        ...Object.keys(guest).reduce((acc, key) => {
          if (guest[key] && guest[key] !== "") {
            acc[key] = guest[key];
          }

          return acc;
        }, {}),
      };

      return saveOrUpdate(data).transacting(trx);
    } catch (error) {
      trx.rollback();
      throw error;
    }
  });
}

async function addGift(id, gift) {
  const guest = await findById(id);

  if (!guest) {
    throw new Error("Guest not found");
  }

  return transaction(Guest.knex(), async (trx) => {
    try {
      return guest.$relatedQuery("gifts", trx).insert(gift);
    } catch (error) {
      trx.rollback();
      throw error;
    }
  });
}

async function removeGift(id, giftId) {
  const guest = await findById(id);

  if (!guest) {
    throw new Error("Guest not found");
  }

  return transaction(Guest.knex(), async (trx) => {
    try {
      return guest.$relatedQuery("gifts", trx).deleteById(giftId);
    } catch (error) {
      trx.rollback();
      throw error;
    }
  });
}

async function getGiftsIds(guest) {
  const guestVerification = await findById(guest.id);
  return guestVerification.gifts.map((gift) => gift.id);
}

export async function deleteGuest(id) {
  return remove(id);
}
