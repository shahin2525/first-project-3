import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") as string });

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
};
