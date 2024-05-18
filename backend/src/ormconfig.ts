import { DataSource } from "typeorm";
import { Airline } from "./api/airline/model/airline.model";
import { Airport } from "./api/airport/model/airport.model";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  synchronize: true,
  logging: false,
  entities: [Airline, Airport],
  migrations: ["src/migrations/*.ts"],
});
