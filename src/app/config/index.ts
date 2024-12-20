import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') as string });

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt: process.env.SALT,
  default_password: process.env.DEFAULT_PASSWORD,
  node_env: process.env.NODE_ENV,
  access_secret_token: process.env.ACCESS_SECRET_TOKEN,
  refresh_secret_token: process.env.REFRESH_SECRET_TOKEN,
  access_expires_in: process.env.ACCESS_EXPIRES_IN,
  refresh_expires_in: process.env.REFRESH_EXPIRES_IN,
};
