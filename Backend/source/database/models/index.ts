import { conexionDB, sequelize } from '../connection/connection'
import { initUsuarioModel, Usuario } from './usuario';
import { Autenticacion, initAutenticacionModel } from './autenticacion';
import { initProductoModel, Producto } from './producto';
import { initCategoriaModel, Categoria } from './categoria';
import { initEjercicioModel, Ejercicio } from './ejercicio';
import { initRecetaModel, Receta } from './receta';


const inicializarDB = async () => {
  try {
    await conexionDB();
    initUsuarioModel(sequelize);
    initAutenticacionModel(sequelize);
    initProductoModel(sequelize);
    initCategoriaModel(sequelize);
    initEjercicioModel(sequelize);
    initRecetaModel(sequelize);
  
    console.log('Modelos inicializados') 
  } catch (error) {
    console.error('Error al inicializar Modelos:', error);  
  }
}

inicializarDB()

export {
  Usuario,
  Autenticacion,
  Producto,
  Categoria,
  Ejercicio,
  Receta,
};
