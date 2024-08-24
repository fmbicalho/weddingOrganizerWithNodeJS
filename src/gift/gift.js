import { Model } from "objection";
import Guest from "../guest/guest.js"; // Direct import

function generateTimestamp() {
  return new Date().toISOString().slice(0, 23).replace("T", " ");
}

class Gift extends Model {
  static get tableName() {
    return "gift";
  }

  static get relationMappings() {
    return {
      guest: {
        relation: Model.BelongsToOneRelation,
        modelClass: Guest, // Directly use the imported model
        join: {
          from: "gift.guest_id",
          to: "guest.id",
        },
      },
    };
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select("id", "gift_type", "amount", "guest_id");
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["gift_type", "amount", "guest_id"],
      properties: {
        id: { type: "integer" },
        gift_type: { type: "string", minLength: 1, maxLength: 50 },
        amount: { type: "number" },
        version: { type: "integer" },
        guest_id: { type: "integer" },
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

  credit(amount) {
    if (amount <= 0) throw new Error("Amount must be greater than 0");
    if (!Number.isInteger(amount)) throw new Error("Amount must be an integer");

    this.balance += amount;
  }

  debit(amount) {
    if (amount <= 0) throw new Error("Amount must be greater than 0");
    if (!Number.isInteger(amount)) throw new Error("Amount must be an integer");
    if (this.balance < amount) throw new Error("Insufficient funds");

    this.balance -= amount;
  }
}

export default Gift;
