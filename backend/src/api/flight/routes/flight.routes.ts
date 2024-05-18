import { Router } from "express";
import { FlightController } from "../controller/flight.controller";

export const flightRouter = Router();
const flightController = new FlightController();

flightRouter.get("/", flightController.getAllFlights.bind(flightController));
flightRouter.get("/:id", flightController.getFlight.bind(flightController));
flightRouter.post("/", flightController.createFlight.bind(flightController));
flightRouter.put("/:id", flightController.updateFlight.bind(flightController));
flightRouter.delete("/:id", flightController.deleteFlight.bind(flightController));
