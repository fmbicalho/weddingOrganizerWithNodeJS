import {
  listStaff,
  getStaff,
  createStaff,
  updateStaff,
  removeStaff,
} from "./staff.dao.js";

export async function getStaffList() {
  return listStaff();
}

export async function getStaffById(id) {
  return getStaff(id);
}
