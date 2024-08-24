import { Model } from "objection";

function generateTimestamp() {
  return new Date().toISOString().slice(0, 23).replace("T", " ");
}

class Guest extends Model {
  static get tableName() {
    return "guest";
  }

  static get relationMappings() {
    return {
      Gift: {
        relation: Model.HasManyRelation,
        modelClass: Gift, // Use a direct import
        join: {
          from: "guest.id",
          to: "gift.guest_id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstName", "lastName", "relation", "status"],
      properties: {
        id: { type: "integer" },
        creationTime: { type: "string", format: "date-time" },
        updateTime: { type: "string", format: "date-time" },
        version: { type: "integer" },
        relation: { type: "string", minLength: 1, maxLength: 30 },
        firstName: { type: "string", minLength: 1, maxLength: 50 },
        lastName: { type: "string", minLength: 1, maxLength: 50 },
        status: { type: "string", minLength: 1, maxLength: 50 },
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

export default Guest;
