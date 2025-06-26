import { Router } from 'express';
import empleadoAPIController from '../../controllers/api/empleados.api.Controller';
const route = Router();


route.get('/empleados', empleadoAPIController.listaEmpleados.bind(empleadoAPIController));
route.get('/empleados/:id', (req, res) => {
    empleadoAPIController.buscarEmpleadoPorId(req, res);
});
route.post('/empleados', (req, res) => { empleadoAPIController.crearEmpleado(req, res) });
route.delete('/empleados/:id' , (res, req) => {empleadoAPIController.delete(res, req) })
route.put('/empleadoEditar/:id', (req, res) => {
    empleadoAPIController.editarEmpleado(req, res);
});
export default route;