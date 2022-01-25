import dotenv from "dotenv";
import { initializeServer } from "./server/index";

dotenv.config();

const port: number | string =
  process.env.PORT ?? process.env.LOCAL_PORT ?? 5000;

(async () => {
  try {
    await initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
