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
  id_membresia: number; // Clave foránea hacia membresia
}

class Usuario extends Model<InferAttributes<Usuario>, InferCreationAttributes<Usuario>> implements UsuarioAttributes {
  declare id: CreationOptional<number>;
  declare apellido: string;
  declare nombre: string;
  declare rol: string;
  declare imagen: string;
  declare fecha_nacimiento: Date;
  declare id_membresia: number;


  static associate(models: any) {
    Usuario.hasOne(models.Autenticacion, {
      foreignKey: 'id_usuario',
    });
    Usuario.belongsTo(models.Membresia, {
      foreignKey: 'id_membresia',
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
        allowNull: true,
      },
      rol: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      id_membresia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'membresias',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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