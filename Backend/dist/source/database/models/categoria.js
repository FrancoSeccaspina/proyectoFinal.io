"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCategoriaModel = exports.Categoria = void 0;
const sequelize_1 = require("sequelize");
class Categoria extends sequelize_1.Model {
    static associate(models) {
    }
}
exports.Categoria = Categoria;
const initCategoriaModel = (sequelize) => {
    Categoria.init({
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
    }, {
        sequelize,
        modelName: 'Categoria',
        tableName: 'categorias',
        freezeTableName: true,
        paranoid: true,
        timestamps: false,
    });
};
exports.initCategoriaModel = initCategoriaModel;
