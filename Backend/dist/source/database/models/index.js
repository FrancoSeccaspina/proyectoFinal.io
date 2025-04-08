"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const usuario_1 = require("./usuario");
Object.defineProperty(exports, "Usuario", { enumerable: true, get: function () { return usuario_1.Usuario; } });
const sequelize = new sequelize_1.Sequelize('gimnasio_activa', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});
exports.sequelize = sequelize;
(0, usuario_1.initUsuarioModel)(sequelize);
