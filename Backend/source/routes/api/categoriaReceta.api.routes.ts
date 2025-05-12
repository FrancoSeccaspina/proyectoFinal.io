import { Router } from 'express';
import categoriesRecetaAPIController from '../../controllers/api/categoriaReceta.api.Controller';
const route = Router();


route.get('/categoriaRecetas', categoriesRecetaAPIController.listaRecetaPorCategoria.bind(categoriesRecetaAPIController));

export default route;