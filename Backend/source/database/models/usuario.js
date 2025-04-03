const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Usuario extends Model {}

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
      edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Valida que el mail tenga formato correcto
        },
      },
      contrasenia: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      perfil: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'usuario',
      },
      fechaNacimiento: {
        type: DataTypes.DATEONLY,
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
      timestamps: false
    }
  );

  return Usuario;
};
