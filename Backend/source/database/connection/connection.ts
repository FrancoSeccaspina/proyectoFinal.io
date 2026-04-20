import { Sequelize } from 'sequelize';
import {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_HOST,
  DATABASE_PASSWORD
} from '../../configEnv';

const sequelize = new Sequelize(
  DATABASE_NAME || '',
  DATABASE_USER || '',
  DATABASE_PASSWORD || '',
  {
    host: DATABASE_HOST || '',
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