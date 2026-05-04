import categoriesRecetaAPIController from '../../controllers/api/categoriaReceta.api.Controller';
import { Router } from 'express';
const route = Router();

route.get('/categorias-recetas', categoriesRecetaAPIController.listaRecetaPorCategoria.bind(categoriesRecetaAPIController));

export default route;