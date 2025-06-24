import {
    Model,
    DataTypes,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
  
  interface CuotaAttributes {
    id: number;
    fecha: Date;
    descripcion: string;
    monto: number;
    estado: string;
    id_usuario: number;
    faltante: Number;
    sobrante: Number
    fecha_fin: Date | null;
    estado_membresia: string;
  }
  class Cuota extends Model<InferAttributes<Cuota>, InferCreationAttributes<Cuota>> implements CuotaAttributes {
    declare id: CreationOptional<number>;
    declare fecha: Date;
    declare descripcion: string;
    declare monto: number;
    declare estado: string;
    declare id_usuario: number;
    declare faltante: Number;
    declare sobrante: Number;
    declare fecha_fin: CreationOptional<Date | null>;

    declare estado_membresia: string;

    static associate(models: any) {

    }
}
const initCuotaModel = (sequelize: Sequelize) => {
    Cuota.init(
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
            descripcion: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            monto: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            estado: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'usuarios',
                  key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
              },
               faltante: {
                type: DataTypes.FLOAT(10, 2),
                allowNull: false,
              }, 
              sobrante: {
                type: DataTypes.FLOAT(10, 2),
                allowNull: false,
            },
            fecha_fin: {
              type: DataTypes.DATEONLY,
              allowNull: true,
            },
            estado_membresia: {
              type: DataTypes.STRING(100),
              allowNull: false,
          },
            },
            {
                sequelize,
                modelName: 'Cuota',
                tableName: 'cuota',
                freezeTableName: true,
                paranoid: true,
                timestamps: false,
              }
    );
};
export { initCuotaModel, Cuota };