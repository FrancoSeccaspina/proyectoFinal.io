"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriaController_1 = __importDefault(require("../controllers/categoriaController"));
const route = (0, express_1.Router)();
route.get("/categorias", (req, res) => { categoriaController_1.default.listaCategorias(req, res); });
route.get("/categorias/:id", (req, res) => { categoriaController_1.default.buscarCategoriasPorId(req, res); });
exports.default = route;
