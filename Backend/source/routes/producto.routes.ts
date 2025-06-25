import { verificarTokenPorRol } from '../middlewares/verificarToken';
import { Roles } from '../constants/roles';
import { Router } from 'express';
import productoController from '../controllers/productoController';

const route = Router();

route.get('/productos', (req, res) => { productoController.listaProductos(req, res) });
route.get('/productos/:id', (req, res) => { productoController.buscarProductosPorId(req, res) });

route.post('/productos', verificarTokenPorRol([Roles.ADMIN]), (req, res) => { productoController.crearProducto(req, res) });
route.delete('/productos/:id', verificarTokenPorRol([Roles.ADMIN]), (req, res) => { productoController.delete(req, res) });
route.put('/productos/:id', verificarTokenPorRol([Roles.ADMIN]), (req, res) => { productoController.editarProducto(req, res) });

export default route;