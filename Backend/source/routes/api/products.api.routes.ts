import { Router } from 'express';
import productoAPIController from '../../controllers/api/producto.api.Controller';
const route = Router();


route.get('/productos', productoAPIController.listaProductos.bind(productoAPIController));

export default route;