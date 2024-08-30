import { getStaffList, getStaffById } from "./staff.service.js";

export async function getStaff(req, res) {
  try {
    const staff = await getStaffList();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getOneStaff(req, res) {
  try {
    const staff = await getStaffById(req.params.id);
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
