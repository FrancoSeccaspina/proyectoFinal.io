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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const models_1 = require("../database/models");
class UsuarioController {
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.Usuario.findOne({ where: { id: req.params.id } });
                if (user) {
                    return res.status(200).json({
                        success: true,
                        message: "Usuario encontrado",
                        user,
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
}
exports.UsuarioController = UsuarioController;
// Exporta la clase para usarla en el enrutador
exports.default = new UsuarioController();
