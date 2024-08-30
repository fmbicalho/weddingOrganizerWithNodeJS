import Staff from "./staff.js";

export async function listStaff() {
  return await Staff.query().select(
    "id",
    "company",
    "description",
    "value",
    "amount_payed",
    "location_id",
  );
}

export async function getStaff(id) {
  return await Staff.query().findById(id);
}

export async function createStaff(staff) {
  return await Staff.query().insert(staff);
}

export async function updateStaff(id, updatedStaff) {
  return await Staff.query().findById(id).patch(updatedStaff);
}

export async function removeStaff(id) {
  return await Staff.query().deleteById(id);
}
