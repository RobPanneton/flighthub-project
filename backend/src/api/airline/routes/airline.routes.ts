import { Router } from "express";
import { AirlineController } from "../controller/airline.controller";

export const router = Router();
const airlineController = new AirlineController();

// Define routes
router.post("/", (req, res) => airlineController.createAirline(req, res));
router.get("/", (req, res) => airlineController.getAllAirlines(req, res));
router.get("/:id", (req, res) => airlineController.getAirlineById(req, res));
router.put("/:id", (req, res) => airlineController.updateAirline(req, res));
router.delete("/:id", (req, res) => airlineController.deleteAirline(req, res));

export default router;
