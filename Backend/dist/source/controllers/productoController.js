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
exports.productoController = void 0;
const producto_1 = require("../database/models/producto");
class productoController {
    crearProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, precio, descripcion } = req.body;
                const nuevoProducto = yield producto_1.Producto.create({ nombre, descripcion, precio, imagen: '', stock: 0 });
                res.status(201).json({
                    message: 'Producto creado exitosamente',
                    producto: nuevoProducto,
                });
            }
            catch (error) {
                console.error('Error al crear el producto:', error);
                res.status(500).json({
                    message: 'Error al crear el producto',
                    error: error.message,
                });
            }
        });
    }
    // Toma todos los productos de la DB y los devuelve en formato JSON
    listaProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productos = yield producto_1.Producto.findAll();
                console.log(productos);
                //res.status(200).json(productos);
                res.render('/productos', { productos });
            }
            catch (error) {
                console.error('Error al listar productos:', error);
                res.status(500).json({ message: 'Error al obtener los productos' });
            }
        });
    }
    // Toma un producto por ID de la DB y lo devuelve en formato JSON
    buscarProductosPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const producto = yield producto_1.Producto.findByPk(id);
                if (producto) {
                    res.status(200).json(producto);
                }
                else {
                    res.status(404).json({ message: 'Producto no encontrado' });
                }
            }
            catch (error) {
                console.error('Error al buscar el producto:', error);
                res.status(500).json({ message: 'Error al obtener el producto' });
            }
        });
    }
}
exports.productoController = productoController;
exports.default = new productoController();
