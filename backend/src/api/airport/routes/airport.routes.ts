import { Router } from "express";
import { AirportController } from "../controller/airport.controller";

export const airportRouter = Router();
const airportController = new AirportController();

airportRouter.get("/", airportController.getAllAirports.bind(airportController));
airportRouter.get("/:id", airportController.getAirport.bind(airportController));
airportRouter.post("/", airportController.createAirport.bind(airportController));
airportRouter.put("/:id", airportController.updateAirport.bind(airportController));
airportRouter.delete("/:id", airportController.deleteAirport.bind(airportController));
