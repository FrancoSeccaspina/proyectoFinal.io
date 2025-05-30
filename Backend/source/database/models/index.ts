import { conexionDB, sequelize } from '../connection/connection'
import { initUsuarioModel, Usuario } from './usuario';
import { Autenticacion, initAutenticacionModel } from './autenticacion';
import { initProductoModel, Producto } from './producto';
import { initCategoriaModel, Categoria } from './categoria';
import { initEjercicioModel, Ejercicio } from './ejercicio';
import { initRecetaModel, Receta } from './receta';
import { initCategoriaRecetaModel, CategoriaReceta } from './categoria_receta'
import { initGrupoMuscularModel, GrupoMuscular } from './grupos_musculares'
import { initProveedorModel, Proveedor } from './proveedores';
import { initCompraModel, Compra } from './compra'
import { initReservaModel, Reserva } from './reserva'
import { initDetalleReservaModel, DetalleReserva } from './detalleReserva'
import { initCuotaModel, Cuota } from './cuota';

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
    initCompraModel(sequelize);
    initReservaModel(sequelize);
    initDetalleReservaModel(sequelize);
    initCuotaModel(sequelize);

    console.log('Modelos inicializados')

    Producto.associate({ DetalleReserva });
    DetalleReserva.associate({ Producto, Reserva });

    console.log('Asociaciones de modelos establecidas');
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
  Compra,
  Reserva,
  DetalleReserva,
  Cuota
};
