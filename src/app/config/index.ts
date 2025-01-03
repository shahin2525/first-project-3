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
  reset_password_ui_link: process.env.RESET_password_UI_LINK,
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
  smtp_pass_key: process.env.smtp_pass_key,
};
