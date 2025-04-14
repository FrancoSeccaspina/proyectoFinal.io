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
exports.categoriaController = void 0;
const categoria_1 = require("../database/models/categoria");
class categoriaController {
    // Toma todas las categorias de la DB y las devuelve en formato JSON
    listaCategorias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categorias = yield categoria_1.Categoria.findAll();
                console.log(categorias);
                res.render("categorias", { categorias });
            }
            catch (error) {
                console.error("Error al listar categorias:", error);
                res.status(500).json({ message: "Error al obtener las categorias" });
            }
        });
    }
    //buscar una categoria en base a su ID y devolverla en formato JSON
    buscarCategoriasPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const categoria = yield categoria_1.Categoria.findByPk(id);
                if (categoria) {
                    res.status(200).json(categoria);
                }
                else {
                    res.status(404).json({ message: "Categoria no encontrada" });
                }
            }
            catch (error) {
                console.error("Error al buscar la categoria:", error);
                res.status(500).json({ message: "Error al obtener la categoria" });
            }
        });
    }
}
exports.categoriaController = categoriaController;
exports.default = new categoriaController();
