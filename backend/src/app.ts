import express, { Application } from "express";
import cors from "cors";

import { airlineRouter } from "./api/airline/routes/airline.routes";
import { airportRouter } from "./api/airport/routes/airport.routes";
import { flightRouter } from "./api/flight/routes/flight.routes";
import { tripRouter } from "./api/trip/routes/trip.routes";

const app: Application = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cors());

app.use("/airlines", airlineRouter);
app.use("/airports", airportRouter);
app.use("/flights", flightRouter);
app.use("/trips", tripRouter);

export default app;
