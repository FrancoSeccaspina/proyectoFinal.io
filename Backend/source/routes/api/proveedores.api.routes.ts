import { Router } from 'express';
import proveedorAPIController from '../../controllers/api/proveedores.api.Controller';
const route = Router();


route.get('/proveedores', proveedorAPIController.listaProveedores.bind(proveedorAPIController));

export default route;