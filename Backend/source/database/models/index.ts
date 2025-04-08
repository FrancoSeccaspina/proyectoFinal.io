import { Sequelize } from 'sequelize';
import { initUsuarioModel, Usuario } from './usuario';

const sequelize = new Sequelize('gimnasio_activa', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

initUsuarioModel(sequelize);

export { sequelize, Usuario };
