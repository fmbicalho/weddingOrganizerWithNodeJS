import { Model } from "objection";

function generateTimestamp() {
  return new Date().toISOString().slice(0, 23).replace("T", " ");
}

class Staff extends Model {
  static get tableName() {
    return "staff";
  }

  static get relationMappings() {
    return {
      location: {
        relation: Model.BelongsToOneRelation,
        modelClass: Location, // Directly use the imported model
        join: {
          from: "staff.location_id",
          to: "location.id",
        },
      },
    };
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(
          "id",
          "company",
          "description",
          "value",
          "amount_payed",
          "location_id",
        );
      },
    };
  }

  //company, description, value, amount_payed
  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "company",
        "description",
        "value",
        "amount_payed",
        "location_id",
      ],
      properties: {
        id: { type: "integer" },
        company: { type: "string", minLength: 1, maxLength: 50 },
        description: { type: "string", minLength: 1, maxLength: 50 },
        value: { type: "number" },
        amount_payed: { type: "number" },
        version: { type: "integer" },
        location_id: { type: "integer" },
        creationTime: { type: "string", format: "date-time" },
        updateTime: { type: "string", format: "date-time" },
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

export default Staff;
