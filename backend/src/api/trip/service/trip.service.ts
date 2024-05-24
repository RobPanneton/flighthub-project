import { AppDataSource } from "../../../ormconfig";
import { Between } from "typeorm";

import { Flight } from "../../flight/model/flight.model";
import { endOfDay, startOfDay } from "date-fns";

export class TripService {
  private flightRepository = AppDataSource.getRepository(Flight);

  async getOneWayTripSuggestions(departure: string, destination: string, date: Date): Promise<any> {
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

  async getRoundTripSuggestions(
    departure: string,
    destination: string,
    departureDate: Date,
    returnDate: Date
  ): Promise<any> {
    try {
      const departureStart = startOfDay(departureDate);
      const departureEnd = endOfDay(departureDate);

      const returnStart = startOfDay(returnDate);
      const returnEnd = endOfDay(returnDate);

      const outgoingFlights = await this.flightRepository.find({
        where: {
          departure_airport: departure,
          arrival_airport: destination,
          departure_time: Between(departureStart, departureEnd),
        },
      });

      const returnFlights = await this.flightRepository.find({
        where: {
          departure_airport: destination,
          arrival_airport: departure,
          departure_time: Between(returnStart, returnEnd),
        },
      });

      const trips: any = [];
      outgoingFlights.forEach((outgoingFlight) => {
        returnFlights.forEach((returnFlight) => {
          trips.push({
            outgoingFlight,
            returnFlight,
            totalPrice: outgoingFlight.price + returnFlight.price,
          });
        });
      });

      return trips;
    } catch (error) {
      console.error("Error retrieving round-trip suggestions:", error);
      throw new Error("Error retrieving round-trip suggestions");
    }
  }
}
