import actividadApiController from "../../controllers/api/actividad.api.controller";    
import { Router } from "express";
import { verificarTokenPorRol } from '../../middlewares/verificarToken';
import { Roles } from '../../constants/roles';

const route = Router();

route.get('/actividad', verificarTokenPorRol([Roles.ADMIN]) ,actividadApiController.listaActividades.bind(actividadApiController));
route.post('/actividad', verificarTokenPorRol([Roles.ADMIN]), actividadApiController.crearActividad.bind(actividadApiController));
route.put('/editarActividad/:id', verificarTokenPorRol([Roles.ADMIN]), actividadApiController.editarActividad.bind(actividadApiController));
route.delete('/eliminarActividad/:id', verificarTokenPorRol([Roles.ADMIN]), actividadApiController.delete.bind(actividadApiController));

export default route;