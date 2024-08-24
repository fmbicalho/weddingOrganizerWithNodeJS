import Finance from "./finance.js";

export async function listFinances() {
  return await Finance.query().select("id", "incomes", "outcomes");
}

export async function getFinance(id) {
  return await Finance.query().findById(id);
}

export async function createFinance(finance) {
  return await Finance.query().insert(finance);
}

export async function updateFinance(id, updatedFinance) {
  return await Finance.query().findById(id).patch(updatedFinance);
}

export async function removeFinance(id) {
  return await Finance.query().deleteById(id);
}
