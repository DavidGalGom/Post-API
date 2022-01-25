import dotenv from "dotenv";
import { initializeServer } from "./server/index";
import initializeMongoDBServer from "./database/index";

dotenv.config();

const port: number | string =
  process.env.PORT ?? process.env.LOCAL_PORT ?? 5000;

(async () => {
  try {
    await initializeServer(port);
    await initializeMongoDBServer(process.env.MONGODB_STRING);
  } catch (error) {
    process.exit(1);
  }
})();
