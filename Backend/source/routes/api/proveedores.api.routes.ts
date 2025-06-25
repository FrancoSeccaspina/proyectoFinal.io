import { verificarTokenPorRol } from '../../middlewares/verificarToken';
import { Roles } from '../../constants/roles';
import { Router } from 'express';
import proveedorAPIController from '../../controllers/api/proveedores.api.Controller';

const route = Router();

route.get('/proveedores', proveedorAPIController.listaProveedores.bind(proveedorAPIController));
route.get('/proveedores/:id', (req, res) => {
    proveedorAPIController.buscarProveedorPorId(req, res);
});

route.post('/proveedores', verificarTokenPorRol([Roles.ADMIN]), (req, res) => { proveedorAPIController.crearProveedor(req, res) });
route.delete('/proveedores/:id', verificarTokenPorRol([Roles.ADMIN]), (res, req) => {proveedorAPIController.delete(res, req) })
route.put('/proveedorEditar/:id', verificarTokenPorRol([Roles.ADMIN]), (req, res) => { proveedorAPIController.editarProveedor(req, res); });

export default route;