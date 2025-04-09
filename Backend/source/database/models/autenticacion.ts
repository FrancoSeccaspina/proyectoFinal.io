import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

interface AutenticacionAttributes {
  id: number;
  email: string;
  contrasenia: Buffer;
}

class Autenticacion
  extends Model<InferAttributes<Autenticacion>, InferCreationAttributes<Autenticacion>>
  implements AutenticacionAttributes
{
  declare id: CreationOptional<number>;
  declare email: string;
  declare contrasenia: Buffer;

  static associate(models: any) {
    // Aquí puedes definir las asociaciones con otros modelos si es necesario
  }
}

const initAutenticacionModel = (sequelize: Sequelize) => {
  Autenticacion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      contrasenia: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Autenticacion',
      tableName: 'autenticacion',
      freezeTableName: true,
      paranoid: true,
      timestamps: false,
    }
  );
};

export { Autenticacion, initAutenticacionModel };