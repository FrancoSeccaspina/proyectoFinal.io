import {
    Model,
    DataTypes,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
  interface Precio_CuotaAttributes {
    id: number;
    precio: number;
    fecha: Date;
  }
    class Precio_Cuota extends Model<InferAttributes<Precio_Cuota>, InferCreationAttributes<Precio_Cuota>> implements Precio_CuotaAttributes {
      declare id: CreationOptional<number>;
      declare fecha: Date;
      declare precio: number;
  }
  const initPrecio_CuotaModel = (sequelize: Sequelize) => {
    Precio_Cuota.init(
          {
              id: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
                  allowNull: false,
              },
              fecha: {
                  type: DataTypes.DATEONLY,
                  allowNull: false,
                },
              precio: {
                  type: DataTypes.DECIMAL(10, 2),
                  allowNull: false,
              },
              },
              {
                  sequelize,
                  modelName: 'Precio_Cuota',
                  tableName: 'precio_cuota',
                  freezeTableName: true,
                  paranoid: true,
                  timestamps: false,
                }
      );
  };
  export { initPrecio_CuotaModel, Precio_Cuota };