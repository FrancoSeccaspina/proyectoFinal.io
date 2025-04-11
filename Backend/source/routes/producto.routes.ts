import { Router } from 'express';
import productoController from '../controllers/productoController';
const route = Router();

//ruta para crear un producto
route.post('/productos', (req, res) => { productoController.crearProducto(req, res) });

// Ruta para listar productos
route.get('/', (req, res) => { productoController.listaProductos(req, res) });
// route.get('/listaProductos', (req, res) => {
//     const productos = [
//       { id: 1, nombre: 'Zapatillas', precio: 12000 },
//       { id: 2, nombre: 'Remera', precio: 4500 },
//       { id: 3, nombre: 'Gorra', precio: 3000 },
//     ];

//     res.render('productos', { productos });
//   });
// Ruta para buscar un producto por ID
route.get('/:id', (req, res) => { productoController.buscarProductosPorId(req, res) });

export default route;