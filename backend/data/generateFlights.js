const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const prices = require("./flightPrices.json");
const airlinesData = require("./airlines.json");
const numFlights = require("./numOfFlights.json");
const durations = require("./flightDurations.json");

const airlines = airlinesData.map((airline) => airline.code);

const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateFlights = (date) => {
  let flights = [];

  for (const departure in durations) {
    for (const arrival in durations[departure]) {
      for (let i = 0; i < numFlights[departure][arrival]; i++) {
        const airline = airlines[getRandomNum(0, airlines.length - 1)];
        const departureTime = new Date(date);
        departureTime.setHours(getRandomNum(0, 23), getRandomNum(0, 59), 0, 0);
        const duration = durations[departure][arrival];
        const arrivalTime = new Date(departureTime);
        arrivalTime.setHours(departureTime.getHours() + duration);
        const price = prices[departure][arrival] + getRandomNum(-15, 15);

        const flight = {
          airline: airline,
          number: getRandomNum(100000, 999999),
          departure_airport: departure,
          departure_time: departureTime.toISOString(),
          arrival_airport: arrival,
          arrival_time: arrivalTime.toISOString(),
          price: price,
        };

        flights.push(flight);
      }
    }
  }

  return flights;
};

const main = (numDays) => {
  const currentDate = new Date();

  let flights = [];

  for (let i = 0; i < numDays; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    flights = flights.concat(generateFlights(date));
  }

  const fileName = `flights_${currentDate.toISOString().replace(/[:.]/g, "-")}.json`;
  const filePath = path.join(__dirname, "generated", fileName);

  if (!fs.existsSync(path.join(__dirname, "generated"))) {
    fs.mkdirSync(path.join(__dirname, "generated"));
  }

  fs.writeFileSync(filePath, JSON.stringify(flights, null, 2), "utf8");
  console.log(`Flights data generated and saved to ${filePath}`);
};

main(14);
