const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { initDataForDocker } = require("./data/generateFlights");

const client = new Client({
  user: process.env.DB_USERNAME || "postgres",
  host: process.env.DB_HOST || "db",
  database: process.env.DB_DATABASE || "flight_hub",
  password: process.env.DB_PASSWORD || "admin",
  port: 5432,
});

console.log({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

const initDb = async () => {
  try {
    await client.connect();

    const airlinesData = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "airlines.json")));
    const airportsData = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "airports.json")));
    const flightsData = initDataForDocker();

    await client.query(`CREATE TABLE IF NOT EXISTS airlines (
      id SERIAL PRIMARY KEY,
      code VARCHAR(10) NOT NULL,
      name VARCHAR(100) NOT NULL
    )`);

    console.log("airlines table created");

    await client.query(`CREATE TABLE IF NOT EXISTS airports (
      id SERIAL PRIMARY KEY,
      code VARCHAR(10) NOT NULL,
      city_code VARCHAR(10) NOT NULL,
      name VARCHAR(100) NOT NULL,
      city VARCHAR(100) NOT NULL,
      country_code VARCHAR(10) NOT NULL,
      region_code VARCHAR(10),
      latitude FLOAT,
      longitude FLOAT,
      timezone VARCHAR(100)
    )`);

    console.log("airports table created");

    await client.query(`CREATE TABLE IF NOT EXISTS flights (
      id SERIAL PRIMARY KEY,
      airline VARCHAR(10) NOT NULL,
      number VARCHAR(10) NOT NULL,
      departure_airport VARCHAR(10) NOT NULL,
      departure_time TIMESTAMP NOT NULL,
      arrival_airport VARCHAR(10) NOT NULL,
      arrival_time TIMESTAMP NOT NULL,
      price DECIMAL(10, 2) NOT NULL
    )`);

    console.log("flights table created");

    for (const airline of airlinesData) {
      await client.query("INSERT INTO airlines (code, name) VALUES ($1, $2)", [airline.code, airline.name]);
    }

    console.log("airlines inserted into table");

    for (const airport of airportsData) {
      await client.query(
        "INSERT INTO airports (code, city_code, name, city, country_code, region_code, latitude, longitude, timezone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          airport.code,
          airport.city_code,
          airport.name,
          airport.city,
          airport.country_code,
          airport.region_code,
          airport.latitude,
          airport.longitude,
          airport.timezone,
        ]
      );
    }

    console.log("airports inserted into table");

    for (const flight of flightsData) {
      await client.query(
        "INSERT INTO flights (airline, number, departure_airport, departure_time, arrival_airport, arrival_time, price) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          flight.airline,
          flight.number,
          flight.departure_airport,
          flight.departure_time,
          flight.arrival_airport,
          flight.arrival_time,
          flight.price,
        ]
      );
    }

    console.log("flights inserted into table");

    await client.end();
  } catch (err) {
    console.error("Error initializing database", err);
    await client.end();
    process.exit(1);
  }
};

initDb();
