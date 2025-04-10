import { Router } from 'express';
import productoController from '../controllers/productoController';
const route = Router();

//ruta para crear un producto
route.post('/productos', (req, res) => { productoController.crearProducto(req, res) });

// Ruta para listar productos
route.get('/productos', (req, res) => { productoController.listaProductos(req, res) });

// Ruta para buscar un producto por ID
route.get('/productos/:id', (req, res) => { productoController.buscarProductosPorId(req, res) });

export default route;