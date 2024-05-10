import express, { Application } from "express";
import airlineRoutes from "./api/airline/routes/airline.routes";

const app: Application = express();
app.use(express.json());

app.use("/airlines", airlineRoutes);

export default app;
