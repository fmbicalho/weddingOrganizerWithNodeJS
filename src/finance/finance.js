import { Model } from "objection";

function generateTimestamp() {
  return new Date().toISOString().slice(0, 23).replace("T", " ");
}

class Finance extends Model {
  static get tableName() {
    return "finance";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["incomes", "outcomes"],
      properties: {
        id: { type: "integer" },
        incomes: { type: "number" },
        outcomes: { type: "number" },
        version: { type: "integer" },
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

export default Finance;
