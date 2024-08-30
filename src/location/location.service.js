import { transaction } from "objection";
import { findAll, findById, saveOrUpdate, remove } from "./location.dao.js";
import Location from "./location.js";

export async function listLocations() {
  return findAll();
}

export async function getLocationById(id) {
  return findById(id);
}

export async function addLocation(location) {
  return transaction(Location.knex(), async (trx) => {
    try {
      return saveOrUpdate(location).transacting(trx);
    } catch (error) {
      trx.rollback();
      throw error;
    }
  });
}

export async function updateLocation(location) {
  return transaction(Location.knex(), async (trx) => {
    try {
      const locationToUpdate = await findById(location.id);

      if (!locationToUpdate) {
        throw new Error("Location not found");
      }

      const data = {
        ...locationToUpdate,
        ...Object.keys(location).reduce((acc, key) => {
          if (location[key] && location[key] !== "") {
            acc[key] = location[key];
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

async function addStaff(id, staff) {
  const location = await findById(id);

  if (!location) {
    throw new Error("Location not found");
  }

  return transaction(Location.knex(), async (trx) => {
    try {
      return location.$relatedQuery("staff", trx).insert(staff);
    } catch (error) {
      trx.rollback();
      throw error;
    }
  });
}

async function removeStaff(id, staffId) {
  const location = await findById(id);

  if (!location) {
    throw new Error("Location not found");
  }

  return transaction(Location.knex(), async (trx) => {
    try {
      return location.$relatedQuery("staff", trx).deleteById(staffId);
    } catch (error) {
      trx.rollback();
      throw error;
    }
  });
}

async function getStaffsIds(location) {
  const locationVerification = await findById(location.id);
  return locationVerification.staff.map((staff) => staff.id);
}

export async function deleteLocation(id) {
  return remove(id);
}
