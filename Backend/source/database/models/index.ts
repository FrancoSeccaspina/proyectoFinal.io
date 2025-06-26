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
import { initMembresiaModel, Membresia } from './membresia';
import { initPrecio_CuotaModel, Precio_Cuota } from './precio_cuota';
import { initTransaccionModel, Transaccion } from './transaccion';
import { initEmpleadoModel, Empleado } from './empleados';

const inicializarDB = async (models: Record<string, any>) => {
  try {
    await conexionDB();

    // TODO : resolver con un metodo statico en cada modelo
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
    initMembresiaModel(sequelize);
    initPrecio_CuotaModel(sequelize);
    initTransaccionModel(sequelize);
    initEmpleadoModel(sequelize);

    console.log('Modelos inicializados')
    //Producto.associate({ DetalleReserva });
    //DetalleReserva.associate({ Producto, Reserva });
    Object.values(models).forEach(model => {
      if (model.associate) {
        model.associate(models);
      }
    });

    console.log('Asociaciones de modelos establecidas');
  } catch (error) {
    console.error('Error al inicializar Modelos:', error);
  }
}

export const models = {
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
  Cuota,
  Membresia,
  Precio_Cuota,
  Transaccion,
  Empleado
};

inicializarDB(models)

export {
  sequelize
};
