import { Router } from "express";
import cuotaApiController from "../../controllers/api/cuota.api.Controller";
//import path from "path";
const route = Router();
route.get('/cuotas', cuotaApiController.listaCuotas.bind(cuotaApiController));
route.get('/cuota/:id_usuario', (req, res) => {
    cuotaApiController.buscarCuotasPorUsuarioId(req, res);
});


export default route;