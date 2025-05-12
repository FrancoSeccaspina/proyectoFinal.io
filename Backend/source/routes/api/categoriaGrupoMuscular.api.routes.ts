import { Router } from 'express';
import categoriesGrupoMuscularAPIController from '../../controllers/api/categoriaEjercicio.api.Controller';
const route = Router();


route.get('/categoriaGrupoMuscular', categoriesGrupoMuscularAPIController.listaEjercicioPorCategoria.bind(categoriesGrupoMuscularAPIController));

export default route;