"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoController_1 = __importDefault(require("../controllers/productoController"));
const route = (0, express_1.Router)();
//ruta para crear un producto
route.post('/productos', (req, res) => { productoController_1.default.crearProducto(req, res); });
// Ruta para listar productos
route.get('/productos', (req, res) => { productoController_1.default.listaProductos(req, res); });
// route.get('/listaProductos', (req, res) => {
//     const productos = [
//       { id: 1, nombre: 'Zapatillas', precio: 12000 },
//       { id: 2, nombre: 'Remera', precio: 4500 },
//       { id: 3, nombre: 'Gorra', precio: 3000 },
//     ];
//     res.render('productos', { productos });
//   });
// Ruta para buscar un producto por ID
route.get('/productos/:id', (req, res) => { productoController_1.default.buscarProductosPorId(req, res); });
exports.default = route;
