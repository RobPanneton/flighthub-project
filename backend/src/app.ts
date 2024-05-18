import express, { Application } from "express";
import { airlineRouter } from "./api/airline/routes/airline.routes";
import { airportRouter } from "./api/airport/routes/airport.routes";
import { flightRouter } from "./api/flight/routes/flight.routes";

const app: Application = express();
app.use(express.json());

app.use("/airlines", airlineRouter);
app.use("/airports", airportRouter);
app.use("/flights", flightRouter);

export default app;
