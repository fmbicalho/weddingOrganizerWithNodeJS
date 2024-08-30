import { Model } from "objection";

function generateTimestamp() {
  return new Date().toISOString().slice(0, 23).replace("T", " ");
}

class Location extends Model {
  static get tableName() {
    return "location";
  }

  static get relationMappings() {
    return {
      Location: {
        relation: Model.HasManyRelation,
        modelClass: Location,
        join: {
          from: "staff.id",
          to: "location.staff_id",
        },
      },
    };
  }

  //name, address, staff_id, creationTime, updateTime, version
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "address", "staff_id"],
      properties: {
        id: { type: "integer" },
        creationTime: { type: "string", format: "date-time" },
        updateTime: { type: "string", format: "date-time" },
        version: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 50 },
        address: { type: "string", minLength: 1, maxLength: 50 },
        staff_id: { type: "string", minLength: 1, maxLength: 50 },
      },
    };
  }

  $beforeInsert() {
    this.creationTime = generateTimestamp();
    this.updateTime = generateTimestamp();
    this.version = 1;
  }

  $beforeUpdate() {
    this.updateTime = generateTimestamp();
    this.version += 1;
  }
}

export default Location;
