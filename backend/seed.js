const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { initDataForSeed } = require("./data/generateFlights");

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function seedTable(tableName, data) {
  for (const item of data) {
    const keys = Object.keys(item).join(", ");
    const values = Object.values(item)
      .map((val) => `'${val}'`)
      .join(", ");
    await pool.query(`INSERT INTO ${tableName} (${keys}) VALUES (${values})`);
  }
}

async function seedDatabase() {
  try {
    const airlines = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "airlines.json"), "utf8"));
    const airports = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "airports.json"), "utf8"));
    const flights = initDataForSeed();

    await seedTable("airlines", airlines);
    await seedTable("airports", airports);
    await seedTable("flights", flights);

    console.log("Database seeding completed.");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await pool.end();
  }
}

seedDatabase();
