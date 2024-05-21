import { AppDataSource } from "../../../ormconfig";
import { Flight } from "../../flight/model/flight.model";

export class TripService {
  private flightRepository = AppDataSource.getRepository(Flight);

  async getTripSuggestions(departure: string, destination: string, date: string): Promise<any> {
    try {
      // Query for direct flights
      const directFlights = await this.flightRepository.find({
        where: {
          departure_airport: departure,
          arrival_airport: destination,
          departure_time: date,
        },
      });

      // Construct trip suggestions
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
