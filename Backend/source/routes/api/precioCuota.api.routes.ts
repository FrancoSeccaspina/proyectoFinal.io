import { Router } from "express";
import precioCuotaApiController from "../../controllers/api/precioCuota.api.Controller";
const route = Router();
route.get('/precioCuota', precioCuotaApiController.listaPrecioCuota.bind(precioCuotaApiController));
route.post('/precioCuota', precioCuotaApiController.crearPrecioCuota.bind(precioCuotaApiController));
route.get('/precioCuota/ultima', precioCuotaApiController.ultimaPrecioCuota.bind(precioCuotaApiController));
export default route;