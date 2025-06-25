import precioCuotaApiController from "../../controllers/api/precioCuota.api.Controller";
import { verificarTokenPorRol } from "../../middlewares/verificarToken";
import { Roles } from "../../constants/roles";
import { Router } from "express";

const route = Router();

route.get('/precioCuota', verificarTokenPorRol([Roles.ADMIN]), precioCuotaApiController.listaPrecioCuota.bind(precioCuotaApiController));
route.post('/precioCuota', verificarTokenPorRol([Roles.ADMIN]), precioCuotaApiController.crearPrecioCuota.bind(precioCuotaApiController));
route.get('/precioCuota/ultima', verificarTokenPorRol([Roles.ADMIN]), precioCuotaApiController.ultimaPrecioCuota.bind(precioCuotaApiController));

export default route;