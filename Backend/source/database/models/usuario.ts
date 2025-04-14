import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

interface UsuarioAttributes {
  id: number;
  apellido: string;
  nombre: string;
  rol: string;
  imagen: string;
  fecha_nacimiento: Date;
}

class Usuario extends Model<InferAttributes<Usuario>, InferCreationAttributes<Usuario>> implements UsuarioAttributes {
  declare id: CreationOptional<number>;
  declare apellido: string;
  declare nombre: string;
  declare rol: string;
  declare imagen: string;
  declare fecha_nacimiento: Date;

  static associate(models: any) {
    Usuario.hasOne(models.Autenticacion, {
      foreignKey: 'id_usuario',
    });
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
      rol: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      fecha_nacimiento: {
        type: DataTypes.DATEONLY,
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