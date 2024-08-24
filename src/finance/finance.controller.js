import { getFinancesList } from "./finance.service.js";

export async function getFinances(req, res) {
  try {
    const finances = await getFinancesList();
    res.status(200).json(finances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
