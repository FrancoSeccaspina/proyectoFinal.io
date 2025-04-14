"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const express_validator_1 = require("express-validator");
const models_1 = require("../database/models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsuarioController {
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield models_1.Usuario.findOne({ where: { id: req.params.id } });
                if (usuario) {
                    return res.status(200).json({
                        success: true,
                        message: "Usuario encontrado",
                        usuario,
                    });
                }
                return res.status(404).json({
                    success: false,
                    message: "Usuario no encontrado",
                });
            }
            catch (error) {
                console.error("Error en show:", error.message);
                return res.status(500).json({
                    success: false,
                    message: "Error interno del servidor",
                });
            }
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const transaction = yield ((_a = models_1.Usuario.sequelize) === null || _a === void 0 ? void 0 : _a.transaction());
            try {
                const result = (0, express_validator_1.validationResult)(req);
                const errores = result.mapped();
                const { apellido, nombre, imagen, email, contrasenia, fecha_nacimiento } = req.body;
                console.log(errores);
                const usuarioExistente = yield models_1.Autenticacion.findOne({ where: { email } });
                if (usuarioExistente) {
                    console.log('El email ya existe');
                    res.render('register', {
                        errorEmail: { email: { msg: 'Email ya registrado' } },
                        oldData: req.body,
                        errors: errores
                    });
                    return res;
                }
                if (!result.isEmpty()) {
                    res.render('register', {
                        errorEmail: { email: { msg: '' } },
                        oldData: req.body,
                        errors: errores
                    });
                    return res;
                }
                const nuevoUsuario = yield models_1.Usuario.create({
                    apellido,
                    nombre,
                    rol: "cliente", // TODO: definir nombre de rol en una variable de entorno/enums
                    imagen,
                    fecha_nacimiento
                }, { transaction });
                // TODO: agregar el numero de vueltas en una variable de entorno
                const hashedPassword = bcryptjs_1.default.hashSync(contrasenia, 10);
                yield models_1.Autenticacion.create({
                    email: email,
                    contrasenia: hashedPassword,
                    id_usuario: nuevoUsuario.id,
                }, { transaction });
                yield (transaction === null || transaction === void 0 ? void 0 : transaction.commit());
                res.redirect('/login');
                return res;
            }
            catch (error) {
                yield (transaction === null || transaction === void 0 ? void 0 : transaction.rollback());
                console.error("Error en register:", error.message);
                return res.status(500).json({
                    success: false,
                    message: "Error interno del servidor",
                });
            }
        });
    }
}
exports.UsuarioController = UsuarioController;
exports.default = new UsuarioController();
