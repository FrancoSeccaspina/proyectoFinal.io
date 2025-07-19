import cuotaApiController from "../../controllers/api/cuota.api.Controller";
import { Router } from "express";
import { verificarTokenPorRol } from '../../middlewares/verificarToken';
import { Roles } from '../../constants/roles';

//import path from "path";
const route = Router();
//Mostrar todas las cuotas por usuario
route.get('/cuotasdelUsuario/:id_usuario', (req, res) => {
    cuotaApiController.buscarCuotasPorUsuarioId(req, res);
});
//Mostrar 1 cuota por id
route.get('/cuotas/:id', (req, res) => {
    cuotaApiController.buscarCuotasPorId(req, res);
});
route.post('/calculoCuotas', (req, res) =>  { cuotaApiController.registrarCuota(req, res)});
route.get('/estadisticas', cuotaApiController.estadisticasCuotas);

route.get('/cuotas', verificarTokenPorRol([Roles.ADMIN]), cuotaApiController.listaCuotas.bind(cuotaApiController));
route.put('/editarCuota/:id', verificarTokenPorRol([Roles.ADMIN]), (req, res) => { cuotaApiController.editarCuota(req, res);});
route.delete('/cuotas/:id', verificarTokenPorRol([Roles.ADMIN]), (res, req) => { cuotaApiController.delete(res, req) })
route.post('/cuotas', verificarTokenPorRol([Roles.ADMIN]), cuotaApiController.crearCuota.bind(cuotaApiController));

export default route;