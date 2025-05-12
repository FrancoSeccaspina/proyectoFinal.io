import { Router } from 'express';
import recetaAPIController from '../../controllers/api/receta.api.Controller';
const route = Router();


route.get('/recetas', recetaAPIController.listarRecetas.bind(recetaAPIController));

export default route;