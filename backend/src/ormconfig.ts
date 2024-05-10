import { DataSource } from "typeorm";
import "dotenv/config";
import { Airline } from "./api/airline/model/airline.model";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  synchronize: true,
  logging: false,
  entities: [Airline],
  migrations: ["src/migration/**/*.ts"],
});
