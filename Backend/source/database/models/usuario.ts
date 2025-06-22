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
  id_membresia: number; // Clave foránea hacia membresia
  fecha_nacimiento: Date;
  celular: number;
  aptoMedico: string;
  dni: string;

}

class Usuario extends Model<InferAttributes<Usuario>, InferCreationAttributes<Usuario>> implements UsuarioAttributes {
  declare id: CreationOptional<number>;
  declare apellido: string;
  declare nombre: string;
  declare rol: string;
  declare imagen: string;
  declare id_membresia: number;
  declare fecha_nacimiento: Date;
  declare celular: number;
  declare aptoMedico: string;
  declare dni: string;


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
      rol: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: 'perfil.jpg'  // <-- valor por defecto
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
      fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      celular: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      aptoMedico: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      dni: {
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