import { Router } from 'express';
import proveedorAPIController from '../../controllers/api/proveedores.api.Controller';
const route = Router();


route.get('/proveedores', proveedorAPIController.listaProveedores.bind(proveedorAPIController));
route.get('/proveedores/:id', (req, res) => {
    proveedorAPIController.buscarProveedorPorId(req, res);
});
route.post('/proveedores', (req, res) => { proveedorAPIController.crearProveedor(req, res) });
route.delete('/proveedores/:id' , (res, req) => {proveedorAPIController.delete(res, req) })
route.put('/proveedorEditar/:id', (req, res) => {
    proveedorAPIController.editarProveedor(req, res);
});
export default route;