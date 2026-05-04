import  gestionPagoProveedoresApiController  from "../../controllers/api/gestion_pago_proveedores.api.Controller";
import { verificarTokenPorRol } from "../../middlewares/verificarToken";
import { Roles } from "../../constants/roles";
import { Router } from "express";

const route = Router();

route.get('/pagos-proveedores', verificarTokenPorRol([Roles.ADMIN]), gestionPagoProveedoresApiController.listaGestionPagoProveedores.bind(gestionPagoProveedoresApiController));
route.post('/pagos-proveedores', verificarTokenPorRol([Roles.ADMIN]), gestionPagoProveedoresApiController.crearGestionPagoProveedor.bind(gestionPagoProveedoresApiController));
export default route;