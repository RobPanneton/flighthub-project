import { Request, Response } from "express";
import { AirportService } from "../service/airport.service";

export class AirportController {
  private airportService: AirportService;

  constructor() {
    this.airportService = new AirportService();
  }

  async getAllAirports(req: Request, res: Response): Promise<Response> {
    try {
      const airports = await this.airportService.findAll();
      return res.json(airports);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }

  async getAirport(req: Request, res: Response): Promise<Response> {
    try {
      const airport = await this.airportService.findOne(+req.params.id);
      if (!airport) {
        return res.status(404).json({ message: "Airport not found" });
      }
      return res.json(airport);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }

  async createAirport(req: Request, res: Response): Promise<Response> {
    try {
      const newAirport = await this.airportService.create(req.body);
      return res.status(201).json(newAirport);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }

  async updateAirport(req: Request, res: Response): Promise<Response> {
    try {
      await this.airportService.update(+req.params.id, req.body);
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }

  async deleteAirport(req: Request, res: Response): Promise<Response> {
    try {
      await this.airportService.remove(+req.params.id);
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
