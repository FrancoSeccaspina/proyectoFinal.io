import precioCuotaApiController from "../../controllers/api/precioCuota.api.Controller";
import { verificarTokenPorRol } from "../../middlewares/verificarToken";
import { Roles } from "../../constants/roles";
import { Router } from "express";
const route = Router();

route.use(verificarTokenPorRol([Roles.ADMIN]))

route.get('/precioCuota', precioCuotaApiController.listaPrecioCuota.bind(precioCuotaApiController));
route.post('/precioCuota', precioCuotaApiController.crearPrecioCuota.bind(precioCuotaApiController));
route.get('/precioCuota/ultima', precioCuotaApiController.ultimaPrecioCuota.bind(precioCuotaApiController));

export default route;