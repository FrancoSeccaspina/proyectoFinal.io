import cuotaApiController from "../../controllers/api/cuota.api.Controller";
import { Router } from "express";
import { verificarTokenPorRol } from '../../middlewares/verificarToken';
import { Roles } from '../../constants/roles';

//import path from "path";
const route = Router();
// Rutas específicas antes que las parametrizadas
route.get('/cuotas/estadisticas', cuotaApiController.estadisticasCuotas);
route.post('/cuotas/calcular', (req, res) =>  { cuotaApiController.registrarCuota(req, res)});

route.get('/usuarios/:id_usuario/cuotas', (req, res) => {
    cuotaApiController.buscarCuotasPorUsuarioId(req, res);
});

route.get('/cuotas', verificarTokenPorRol([Roles.ADMIN]), cuotaApiController.listaCuotas.bind(cuotaApiController));
route.post('/cuotas', verificarTokenPorRol([Roles.ADMIN]), cuotaApiController.crearCuota.bind(cuotaApiController));

// Rutas parametrizadas al final
route.get('/cuotas/:id', (req, res) => {
    cuotaApiController.buscarCuotasPorId(req, res);
});
route.put('/cuotas/:id', verificarTokenPorRol([Roles.ADMIN]), (req, res) => { cuotaApiController.editarCuota(req, res);});
route.delete('/cuotas/:id', verificarTokenPorRol([Roles.ADMIN]), (res, req) => { cuotaApiController.delete(res, req) })

export default route;