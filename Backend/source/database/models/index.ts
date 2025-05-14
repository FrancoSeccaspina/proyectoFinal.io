import { initUsuarioModel, Usuario } from './usuario';
import { Autenticacion, initAutenticacionModel } from './autenticacion';
import { initProductoModel, Producto } from './producto';
import { initCategoriaModel, Categoria } from './categoria';
import { initEjercicioModel, Ejercicio } from './ejercicio';
import { initRecetaModel, Receta } from './receta';
import { initCategoriaRecetaModel, CategoriaReceta } from './categoria_receta'
import { initGrupoMuscularModel, GrupoMuscular } from './grupos_musculares'
import { initProveedorModel, Proveedor } from './proveedores';
import { conexionDB, sequelize } from '../connection/connection'

const inicializarDB = async () => {
  try {
    await conexionDB();

    initUsuarioModel(sequelize);
    initAutenticacionModel(sequelize);
    initProductoModel(sequelize);
    initCategoriaModel(sequelize);
    initEjercicioModel(sequelize);
    initRecetaModel(sequelize);
    initCategoriaRecetaModel(sequelize);
    initGrupoMuscularModel(sequelize);
    initProveedorModel(sequelize);

    console.log('Modelos inicializados')
  } catch (error) {
    console.error('Error al inicializar Modelos:', error);
  }
}

inicializarDB()

export {
  sequelize,
  Usuario,
  Autenticacion,
  Producto,
  Categoria,
  Ejercicio,
  Receta,
  CategoriaReceta,
  GrupoMuscular,
  Proveedor,
};
