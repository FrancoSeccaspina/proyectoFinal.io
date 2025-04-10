import { Sequelize } from 'sequelize';
import { initUsuarioModel, Usuario } from './usuario';
import { Autenticacion, initAutenticacionModel } from './autenticacion';
import { initProductoModel, Producto } from './producto';

const sequelize = new Sequelize('gimnasio_activa', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

initUsuarioModel(sequelize);
initAutenticacionModel(sequelize);
initProductoModel(sequelize);

export { sequelize, Usuario, Autenticacion, Producto };
