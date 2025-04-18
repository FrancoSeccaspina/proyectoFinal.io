"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAutenticacionModel = exports.Autenticacion = void 0;
const sequelize_1 = require("sequelize");
class Autenticacion extends sequelize_1.Model {
    static associate(models) {
        Autenticacion.belongsTo(models.Usuario, {
            foreignKey: 'id_usuario',
        });
    }
}
exports.Autenticacion = Autenticacion;
const initAutenticacionModel = (sequelize) => {
    Autenticacion.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        contrasenia: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        id_usuario: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    }, {
        sequelize,
        modelName: 'Autenticacion',
        tableName: 'autenticacion',
        freezeTableName: true,
        paranoid: true,
        timestamps: false,
    });
};
exports.initAutenticacionModel = initAutenticacionModel;
