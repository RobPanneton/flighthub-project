import { Router } from "express";
import { TripController } from "../controller/trip.controller";

export const tripRouter = Router();
const tripController = new TripController();

tripRouter.get("/suggestions", tripController.getTripSuggestions.bind(tripController));
