import dotenv from 'dotenv';
import app from './app.js';
import { sequelize } from './database/database.js';

dotenv.config();

const port = process.env.PORT || 3000;

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
