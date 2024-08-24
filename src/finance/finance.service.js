import { listFinances, getFinance } from "./finance.dao.js";

export async function getFinancesList() {
  return listFinances();
}

export async function getFinanceById(id) {
  return getFinance(id);
}
