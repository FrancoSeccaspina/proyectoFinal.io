import { Router } from 'express';
import carritoController from '../controllers/carritoController';
const route = Router();


route.post('/carrito/agregar', (res, req) => { carritoController.agregarProducto(res, req) })

export default route;