import { getGiftsList, getGiftById } from "./gift.service.js";

export async function getGifts(req, res) {
  try {
    const gifts = await getGiftsList();
    res.status(200).json(gifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getGift(req, res) {
  try {
    const gift = await getGiftById(req.params.id);
    res.status(200).json(gift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
