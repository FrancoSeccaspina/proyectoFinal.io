import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME || '',
  process.env.DATABASE_USER || '',
  process.env.DATABASE_PASSWORD || '',
  {
    host: process.env.DATABASE_HOST || '',
    dialect: 'mysql',
    logging: false,
  }
);

const conexionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

export { sequelize, conexionDB };