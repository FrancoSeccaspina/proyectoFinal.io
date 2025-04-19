import { Sequelize } from 'sequelize';
import { initUsuarioModel, Usuario } from './usuario';
import { Autenticacion, initAutenticacionModel } from './autenticacion';
import { initProductoModel, Producto } from './producto';
import { initCategoriaModel, Categoria } from './categoria';
import { initEjercicioModel, Ejercicio } from './ejercicio';
import { initRecetaModel, Receta } from './receta';


const sequelize = new Sequelize('gimnasio_activa', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

initUsuarioModel(sequelize);
initAutenticacionModel(sequelize);
initProductoModel(sequelize);
initCategoriaModel(sequelize);
initEjercicioModel(sequelize);
initRecetaModel(sequelize);

export {
  sequelize,
  Usuario,
  Autenticacion,
  Producto,
  Categoria,
  Ejercicio,
  Receta,
};
