"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = exports.Producto = exports.Autenticacion = exports.Usuario = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const usuario_1 = require("./usuario");
Object.defineProperty(exports, "Usuario", { enumerable: true, get: function () { return usuario_1.Usuario; } });
const autenticacion_1 = require("./autenticacion");
Object.defineProperty(exports, "Autenticacion", { enumerable: true, get: function () { return autenticacion_1.Autenticacion; } });
const producto_1 = require("./producto");
Object.defineProperty(exports, "Producto", { enumerable: true, get: function () { return producto_1.Producto; } });
const categoria_1 = require("./categoria");
Object.defineProperty(exports, "Categoria", { enumerable: true, get: function () { return categoria_1.Categoria; } });
const sequelize = new sequelize_1.Sequelize('gimnasio_activa', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});
exports.sequelize = sequelize;
(0, usuario_1.initUsuarioModel)(sequelize);
(0, autenticacion_1.initAutenticacionModel)(sequelize);
(0, producto_1.initProductoModel)(sequelize);
(0, categoria_1.initCategoriaModel)(sequelize);
