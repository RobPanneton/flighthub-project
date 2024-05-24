import { AppDataSource } from "../../../ormconfig";
import { Between } from "typeorm";

import { Flight } from "../../flight/model/flight.model";
import { endOfDay, startOfDay } from "date-fns";

export class TripService {
  private flightRepository = AppDataSource.getRepository(Flight);

  async getTripSuggestions(departure: string, destination: string, date: Date): Promise<any> {
    try {
      const start = startOfDay(date);
      const end = endOfDay(date);

      // query for direct flights
      const directFlights = await this.flightRepository.find({
        where: {
          departure_airport: departure,
          arrival_airport: destination,
          departure_time: Between(start, end),
        },
      });

      // construct trip suggestions
      const trips = directFlights.map((flight) => ({
        flight,
        totalPrice: flight.price,
      }));

      return trips;
    } catch (error) {
      console.error("Error retrieving trip suggestions:", error);
      throw new Error("Error retrieving trip suggestions");
    }
  }
}
