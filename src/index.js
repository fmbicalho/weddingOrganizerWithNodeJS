import knex from "./config/db.config.js"; // Import the configured Knex instance
import express from "express";

import guestRouter from "./guest/guest.router.js";
import giftRouter from "./gift/gift.router.js";
import financeRouter from "./finance/finance.router.js";

import cors from "cors";
import path from "path";
import url from "url"; // Import the url module

import Guest from "./guest/guest.js";
import Gift from "./gift/gift.js";
import Finance from "./finance/finance.js";

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

// Resolve __dirname equivalent in ES modules
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors()); // Enable CORS if needed

// Set up EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Route to render the home view
app.get("/", async (req, res) => {
  try {
    // Query the database using Knex
    const guestCount = await knex("guest").count("* as count").first();
    const totalGifts = await knex("gift").sum("amount as sum").first();
    const financesCount = await knex("finance").count("* as count").first();
    const staffCount = await knex("staff").count("* as count").first();
    const locationsCount = await knex("location").count("* as count").first();

    // Render the home view with the data
    res.render("home", {
      guestCount: guestCount.count,
      totalGifts: totalGifts.sum,
      financesCount: financesCount.count,
      staffCount: staffCount.count,
      locationsCount: locationsCount.count,
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).send("Error fetching data");
  }
});

// Route to render guests (view)
app.get("/guests", async (req, res) => {
  try {
    const guests = await Guest.query();
    res.render("guest", { guests });
  } catch (error) {
    res.status(500).send("Error fetching guests");
  }
});

// Route to render gifts (view)
app.get("/gifts", async (req, res) => {
  try {
    // Fetch gifts with related guest information
    const gifts = await Gift.query()
      .select(
        "gift.id",
        "gift.gift_type",
        "gift.amount",
        "guest.firstName",
        "guest.lastName",
      )
      .joinRelated("guest");

    // Calculate total amount
    const totalAmount = gifts.reduce((sum, gift) => sum + gift.amount, 0);

    // Render the gifts page with the gifts and total amount
    res.render("gift", { gifts, totalAmount });
  } catch (error) {
    console.error("Error fetching gifts:", error);
    res.status(500).send(`Error fetching gifts: ${error.message}`);
  }
});

app.get("/finances", async (req, res) => {
  try {
    const finances = await Finance.query().first();
    const totalIncome = finances.incomes;
    const totalOutcome = finances.outcomes;
    const totalBalance = totalIncome - totalOutcome;

    res.render("finance", { totalIncome, totalOutcome, totalBalance });
  } catch (error) {
    console.error("Error fetching finances:", error);
    res.status(500).send("Internal Server Error");
  }
});

// API routes
app.use("/api", guestRouter);
app.use("/api", giftRouter);
app.use("/api", financeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
