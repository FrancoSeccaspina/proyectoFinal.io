import categoriesRecetaAPIController from '../../controllers/api/categoriaReceta.api.Controller';
import { verificarTokenPorRol } from '../../middlewares/verificarToken';
import { Roles } from '../../constants/roles';
import { Router } from 'express';
const route = Router();

route.get('/categoriaRecetas', verificarTokenPorRol([Roles.ADMIN]), categoriesRecetaAPIController.listaRecetaPorCategoria.bind(categoriesRecetaAPIController));

export default route;