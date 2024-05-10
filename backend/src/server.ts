import "reflect-metadata";
import "dotenv/config";

import app from "./app";
import { AppDataSource } from "./ormconfig";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();

    app.listen(+PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
};

startServer();
