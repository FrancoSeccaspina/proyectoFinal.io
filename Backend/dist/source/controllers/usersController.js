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
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, contrasenia } = req.body;
                const usuarioExistente = yield models_1.Autenticacion.findOne({ where: { email } });
                if (usuarioExistente) {
                    return res.status(400).json({
                        success: false,
                        message: "El usuario ya existe",
                    });
                }
                const nuevoUsuario = yield models_1.Usuario.create(req.body);
                // Crear la autenticación para el nuevo usuario
                const hashedPassword = bcryptjs_1.default.hashSync(contrasenia, 10);
                yield models_1.Autenticacion.create({
                    email,
                    contrasenia: hashedPassword,
                    usuarioId: nuevoUsuario.id,
                });
                return res.status(201).json({
                    success: true,
                    message: "Usuario registrado correctamente",
                    usuario: nuevoUsuario,
                });
            }
            catch (error) {
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
// Exporta la clase para usarla en el enrutador
exports.default = new UsuarioController();
