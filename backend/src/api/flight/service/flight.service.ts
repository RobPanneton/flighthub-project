import { Repository } from "typeorm";
import { Flight } from "../model/flight.model";
import { AppDataSource } from "../../../ormconfig";

export class FlightService {
  private flightRepository: Repository<Flight>;

  constructor() {
    this.flightRepository = AppDataSource.getRepository(Flight);
  }

  async findAll(): Promise<Flight[]> {
    try {
      return await this.flightRepository.find();
    } catch (error) {
      console.error("Error retrieving flights:", error);
      throw new Error("Error retrieving flights");
    }
  }

  async findOne(id: number): Promise<Flight | null> {
    try {
      return await this.flightRepository.findOneBy({ id });
    } catch (error) {
      console.error("Error retrieving flight:", error);
      throw new Error("Error retrieving flight");
    }
  }

  async create(flightData: Partial<Flight>): Promise<Flight> {
    try {
      const flight = this.flightRepository.create(flightData);
      return await this.flightRepository.save(flight);
    } catch (error) {
      console.error("Error creating flight:", error);
      throw new Error("Error creating flight");
    }
  }

  async update(id: number, flightData: Partial<Flight>): Promise<void> {
    try {
      const updateResult = await this.flightRepository.update(id, flightData);
      if (updateResult.affected === 0) {
        throw new Error("No flight found with the provided ID.");
      }
    } catch (error) {
      console.error("Error updating flight:", error);
      throw new Error("Error updating flight");
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const deleteResult = await this.flightRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new Error("No flight found with the provided ID.");
      }
    } catch (error) {
      console.error("Error deleting flight:", error);
      throw new Error("Error deleting flight");
    }
  }
}
