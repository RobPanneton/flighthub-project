import { Repository } from "typeorm";
import { Airline } from "../model/airline.model";
import { AppDataSource } from "../../../ormconfig";

export class AirlineService {
  private airlineRepository: Repository<Airline>;

  constructor() {
    this.airlineRepository = AppDataSource.getRepository(Airline);
  }

  async createAirline(airlineData: Airline | Airline[]): Promise<Airline | Airline[]> {
    // split logic to handle typescript linting over Airline | Airline[] type
    if (Array.isArray(airlineData)) {
      // if airlineData is an array, process each airline in the array
      const airlines = this.airlineRepository.create(airlineData); // Create multiple new airline instances
      return await this.airlineRepository.save(airlines); // Save all new instances
    } else {
      // if airlineData is a single airline object
      const airline = this.airlineRepository.create(airlineData); // Create a new airline instance
      return await this.airlineRepository.save(airline); // Save the instance
    }
  }

  async getAllAirlines(): Promise<Airline[]> {
    return await this.airlineRepository.find();
  }

  async getAirlineById(id: number): Promise<Airline | null> {
    return await this.airlineRepository.findOneBy({ id });
  }

  async updateAirline(id: number, airlineData: Partial<Airline>): Promise<Airline | null> {
    await this.airlineRepository.update(id, airlineData);
    return this.getAirlineById(id);
  }

  async deleteAirline(id: number): Promise<void> {
    await this.airlineRepository.delete(id);
  }
}
