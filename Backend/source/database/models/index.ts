import { Sequelize } from 'sequelize';
import { initUsuarioModel, Usuario } from './usuario';
import { Autenticacion, initAutenticacionModel} from './autenticacion';

const sequelize = new Sequelize('gimnasio_activa', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

initUsuarioModel(sequelize);
initAutenticacionModel(sequelize);

export { sequelize, Usuario, Autenticacion };
