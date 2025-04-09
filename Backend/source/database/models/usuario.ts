import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from 'sequelize';

interface UsuarioAttributes {
  id: number;
  apellido: string;
  nombre: string;
  imagen: string;
}

class Usuario extends Model<InferAttributes<Usuario>, InferCreationAttributes<Usuario>> implements UsuarioAttributes {

  declare id: CreationOptional<number>;
  declare apellido: string;
  declare nombre: string;
  declare imagen: string;

  static associate(models: any) {
  }
}

const initUsuarioModel = (sequelize: Sequelize) => {
  Usuario.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuarios',
      freezeTableName: true,
      paranoid: true,
      timestamps: false,
    }
  );
};

export { Usuario, initUsuarioModel };
