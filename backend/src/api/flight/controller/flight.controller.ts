import { Request, Response } from "express";
import { FlightService } from "../service/flight.service";

export class FlightController {
  private flightService: FlightService;

  constructor() {
    this.flightService = new FlightService();
  }

  async getAllFlights(req: Request, res: Response): Promise<Response> {
    try {
      const flights = await this.flightService.findAll();
      return res.json(flights);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }

  async getFlight(req: Request, res: Response): Promise<Response> {
    try {
      const flight = await this.flightService.findOne(+req.params.id);
      if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
      }
      return res.json(flight);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }

  async createFlight(req: Request, res: Response): Promise<Response> {
    try {
      const flightData = req.body;

      // Check if flightData is an array
      if (Array.isArray(flightData)) {
        // Validate each flight in the array
        for (const flight of flightData) {
          if (
            !flight.airline ||
            !flight.number ||
            !flight.departure_airport ||
            !flight.departure_time ||
            !flight.arrival_airport ||
            !flight.arrival_time ||
            !flight.price
          ) {
            return res.status(400).json({ error: "Missing required flight data in array" });
          }
        }
        const newFlights = await this.flightService.createMany(flightData);
        return res.status(201).json(newFlights);
      } else {
        // Validate single flight object
        if (
          !flightData.airline ||
          !flightData.number ||
          !flightData.departure_airport ||
          !flightData.departure_time ||
          !flightData.arrival_airport ||
          !flightData.arrival_time ||
          !flightData.price
        ) {
          return res.status(400).json({ error: "Missing required flight data" });
        }
        const newFlight = await this.flightService.create(flightData);
        return res.status(201).json(newFlight);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }

  async updateFlight(req: Request, res: Response): Promise<Response> {
    try {
      const flightData = req.body;
      if (!flightData) {
        return res.status(400).json({ error: "Missing flight data" });
      }
      await this.flightService.update(+req.params.id, flightData);
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }

  async deleteFlight(req: Request, res: Response): Promise<Response> {
    try {
      await this.flightService.remove(+req.params.id);
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }
}
