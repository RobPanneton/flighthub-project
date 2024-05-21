import { Request, Response } from "express";
import { TripService } from "../service/trip.service";

export class TripController {
  private tripService: TripService;

  constructor() {
    this.tripService = new TripService();
  }

  async getTripSuggestions(req: Request, res: Response): Promise<Response> {
    try {
      const { departure, destination, date } = req.query;
      if (!departure || !destination || !date) {
        return res.status(400).json({ error: "Missing required query parameters" });
      }

      const trips = await this.tripService.getTripSuggestions(
        departure as string,
        destination as string,
        date as string
      );
      return res.json(trips);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }
}
