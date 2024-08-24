import Guest from "./guest.js";

export async function findAll() {
  return Guest.query().select(
    "id",
    "firstName",
    "lastName",
    "relation",
    "status",
  );
}

export async function findById(id) {
  return Guest.query()
    .findById(id)
    .select("id", "firstName", "lastName", "relation", "status")
    .withGraphFetched("gifts(defaultSelects)");
}

export function saveOrUpdate(guest) {
  return guest.id
    ? Guest.query().patchAndFetchById(guest.id, guest)
    : Guest.query().insert(guest);
}

export function remove(id) {
  return Guest.query().deleteById(id);
}
