import { Request, Response } from "express";
import { AirlineService } from "../service/airline.service";

export class AirlineController {
  private airlineService: AirlineService;

  constructor() {
    this.airlineService = new AirlineService();
  }

  async createAirline(req: Request, res: Response): Promise<Response> {
    try {
      const airline = await this.airlineService.createAirline(req.body);
      return res.status(201).json(airline);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }

  async getAllAirlines(req: Request, res: Response): Promise<Response> {
    try {
      const airlines = await this.airlineService.getAllAirlines();
      return res.status(200).json(airlines);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }

  async getAirlineById(req: Request, res: Response): Promise<Response> {
    try {
      const airline = await this.airlineService.getAirlineById(
        parseInt(req.params.id)
      );
      if (airline) {
        return res.status(200).json(airline);
      } else {
        return res.status(404).json({ message: "Airline not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Unknown error", message: error });
      }
    }
  }

  async updateAirline(req: Request, res: Response): Promise<Response> {
    try {
      const updatedAirline = await this.airlineService.updateAirline(
        parseInt(req.params.id),
        req.body
      );
      return res.status(200).json(updatedAirline);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }

  async deleteAirline(req: Request, res: Response): Promise<Response> {
    try {
      await this.airlineService.deleteAirline(parseInt(req.params.id));
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
