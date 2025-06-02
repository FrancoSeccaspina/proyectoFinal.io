import { Router } from "express";
import cuotaApiController from "../../controllers/api/cuota.api.Controller";
//import path from "path";
const route = Router();
route.get('/cuotas', cuotaApiController.listaCuotas.bind(cuotaApiController));
//Mostrar todas las cuotas por usuario
route.get('/cuotasdelUsuario/:id_usuario', (req, res) => {
    cuotaApiController.buscarCuotasPorUsuarioId(req, res);
});
//Mostrar 1 cuota por id
route.get('/cuotas/:id', (req, res) => {
    cuotaApiController.buscarCuotasPorId(req, res);
});
route.put('/editarCuota/:id', (req, res) => {
    cuotaApiController.editarCuota(req, res);
});
route.delete('/cuotas/:id', (res, req) => { cuotaApiController.delete(res, req) })

route.post('/cuotas', cuotaApiController.crearCuota.bind(cuotaApiController));

route.post('/calculoCuotas', (req, res) =>  { cuotaApiController.registrarCuota(req, res)});

export default route;