import { Router } from 'express';
import categoriesAPIController from '../../controllers/api/categoria.api.Controller';
const route = Router();


route.get('/categoriaProductos', categoriesAPIController.listaProductosPorCategoria.bind(categoriesAPIController));

export default route;