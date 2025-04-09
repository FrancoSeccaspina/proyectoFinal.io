"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = exports.initProductoModel = void 0;
const sequelize_1 = require("sequelize");
class Producto extends sequelize_1.Model {
    static associate(models) {
    }
}
exports.Producto = Producto;
const initProductoModel = (sequelize) => {
    Producto.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        descripcion: {
            type: sequelize_1.DataTypes.STRING(500),
            allowNull: false,
        },
        precio: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        imagen: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        stock: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Producto',
        tableName: 'productos',
        freezeTableName: true,
        paranoid: true,
        timestamps: false,
    });
};
exports.initProductoModel = initProductoModel;
