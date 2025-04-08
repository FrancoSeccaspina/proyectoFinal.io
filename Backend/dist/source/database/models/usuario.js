"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUsuarioModel = exports.Usuario = void 0;
const sequelize_1 = require("sequelize");
class Usuario extends sequelize_1.Model {
    static associate(models) {
    }
}
exports.Usuario = Usuario;
const initUsuarioModel = (sequelize) => {
    Usuario.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        apellido: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        nombre: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false,
        },
        imagen: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        freezeTableName: true,
        paranoid: true,
        timestamps: false,
    });
};
exports.initUsuarioModel = initUsuarioModel;
