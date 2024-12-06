import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') as string });

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt: process.env.SALT,
  default_password: process.env.DEFAULT_PASSWORD,
  node_env: process.env.NODE_ENV,
};
