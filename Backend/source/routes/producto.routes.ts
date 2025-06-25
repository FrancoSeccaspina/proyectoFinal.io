import { verificarTokenPorRol } from '../middlewares/verificarToken';
import { Roles } from '../constants/roles';
import { Router } from 'express';
import productoController from '../controllers/productoController';

const route = Router();

route.get('/productos', (req, res) => { productoController.listaProductos(req, res) });
route.get('/productos/:id', (req, res) => { productoController.buscarProductosPorId(req, res) });

route.use(verificarTokenPorRol([Roles.ADMIN]));
route.post('/productos', (req, res) => { productoController.crearProducto(req, res) });
route.delete('/productos/:id', (req, res) => { productoController.delete(req, res) });
route.put('/productos/:id', (req, res) => { productoController.editarProducto(req, res) });

export default route;