import { Repository } from "typeorm";
import { Airport } from "../model/airport.model";
import { AppDataSource } from "../../../ormconfig";

export class AirportService {
  private airportRepository: Repository<Airport>;

  constructor() {
    this.airportRepository = AppDataSource.getRepository(Airport);
  }

  async findAll(): Promise<Airport[]> {
    return await this.airportRepository.find();
  }

  async findOne(id: number): Promise<Airport | null> {
    return await this.airportRepository.findOneBy({ id });
  }

  async create(airportData: Partial<Airport>): Promise<Airport> {
    const airport = this.airportRepository.create(airportData);
    return await this.airportRepository.save(airport);
  }

  async update(id: number, airportData: Partial<Airport>): Promise<void> {
    await this.airportRepository.update(id, airportData);
  }

  async remove(id: number): Promise<void> {
    await this.airportRepository.delete(id);
  }
}
