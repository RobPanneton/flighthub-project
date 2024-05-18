import { Router } from "express";
import { AirlineController } from "../controller/airline.controller";

export const airlineRouter = Router();
const airlineController = new AirlineController();

// Define routes
airlineRouter.post("/", (req, res) => airlineController.createAirline(req, res));
airlineRouter.get("/", (req, res) => airlineController.getAllAirlines(req, res));
airlineRouter.get("/:id", (req, res) => airlineController.getAirlineById(req, res));
airlineRouter.put("/:id", (req, res) => airlineController.updateAirline(req, res));
airlineRouter.delete("/:id", (req, res) => airlineController.deleteAirline(req, res));
