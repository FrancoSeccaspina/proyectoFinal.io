"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoController_1 = require("../controllers/productoController");
const router = (0, express_1.Router)();
//ruta para crear un producto
router.post('/productos', (req, res) => { (0, productoController_1.crearProducto)(req, res); });
// Ruta para listar productos
router.get('/productos', productoController_1.listaProductos);
// Ruta para buscar un producto por ID
router.get('/productos/:id', productoController_1.buscarProductosPorId);
exports.default = router;
