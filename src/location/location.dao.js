import Location from "./location.js";

export async function findAll() {
  return Guest.query().select("id", "name", "address", "staff_id");
}

export async function findById(id) {
  return Location.query()
    .findById(id)
    .select("id", "name", "address", "staff_id")
    .withGraphFetched("locations(defaultSelects)");
}

export function saveOrUpdate(location) {
  return location.id
    ? Location.query().patchAndFetchById(location.id, location)
    : Location.query().insert(location);
}

export function remove(id) {
  return Location.query().deleteById(id);
}
