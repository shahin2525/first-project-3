import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
const a = 10;
async function main() {
  await mongoose.connect(config.db_url as string);

  try {
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main();
