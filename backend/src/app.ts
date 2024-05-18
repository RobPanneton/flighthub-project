import express, { Application } from "express";
import { airlineRouter } from "./api/airline/routes/airline.routes";
import { airportRouter } from "./api/airport/routes/airport.routes";

const app: Application = express();
app.use(express.json());

app.use("/airlines", airlineRouter);
app.use("/airports", airportRouter);

export default app;
