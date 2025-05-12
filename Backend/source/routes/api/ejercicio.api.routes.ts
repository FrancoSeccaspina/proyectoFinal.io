import { Router } from 'express';
import ejerciciosApiController from "../../controllers/api/ejercicio.api.Controller"
const route = Router();

route.get("/ejercicios", ejerciciosApiController.listaEjercicios.bind(ejerciciosApiController));
export default route;