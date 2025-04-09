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
exports.crearProducto = exports.buscarProductosPorId = exports.listaProductos = void 0;
const producto_1 = require("../database/models/producto");
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, precio, descripcion } = req.body;
        const nuevoProducto = yield producto_1.Producto.create({ nombre, descripcion, precio, imagen: '', stock: 0 });
        return res.status(201).json({
            message: 'Producto creado exitosamente',
            producto: nuevoProducto,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Error al crear el producto',
            error: error.message,
        });
    }
});
exports.crearProducto = crearProducto;
// Toma todos los productos de la DB y los devuelve en formato JSON
const listaProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield producto_1.Producto.findAll();
        res.status(200).json(productos);
    }
    catch (error) {
        console.error('Error al listar productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});
exports.listaProductos = listaProductos;
// Toma un producto por ID de la DB y lo devuelve en formato JSON
const buscarProductosPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const producto = yield producto_1.Producto.findByPk(id);
        if (producto) {
            res.status(200).json(producto);
        }
        else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }
    catch (error) {
        console.error('Error al listar productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});
exports.buscarProductosPorId = buscarProductosPorId;
