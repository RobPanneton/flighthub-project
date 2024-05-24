import { Request, Response } from "express";
import { TripService } from "../service/trip.service";

export class TripController {
  private tripService: TripService;

  constructor() {
    this.tripService = new TripService();
  }

  async getTripSuggestions(req: Request, res: Response): Promise<Response> {
    try {
      const { departure, destination, departure_date, return_date } = req.body;

      if (!departure || !destination || !departure_date) {
        return res.status(400).json({ error: "Missing required query parameters" });
      }

      const departureDate = new Date(departure_date);
      const returnDate = new Date(return_date);

      let trips;

      if (return_date) {
        trips = await this.tripService.getRoundTripSuggestions(departure, destination, departureDate, returnDate);
      } else {
        trips = await this.tripService.getOneWayTripSuggestions(departure, destination, departureDate);
      }

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
