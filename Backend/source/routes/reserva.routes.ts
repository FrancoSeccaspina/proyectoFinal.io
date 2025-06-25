import { Router, Request, Response } from "express";
import { verificarTokenPorRol } from '../middlewares/verificarToken';
import { Roles } from '../constants/roles';
import reservaController from '../controllers/reservaController'

const route = Router();

// Rutas del reservas
route.get("/reserva/mostrar/ultimaReserva", verificarTokenPorRol([Roles.CLIENTE]), (req: Request, res: Response) => { reservaController.mostrarUltimaReserva(req, res) });
route.get("/reserva/mostrar/reserva/:id", verificarTokenPorRol([Roles.CLIENTE]), (req: Request, res: Response) => { reservaController.mostrarReservaPorId(req, res) });
route.get("/reserva/mostrar/reservas", verificarTokenPorRol([Roles.CLIENTE]), (req: Request, res: Response) => { reservaController.mostrarReservas(req, res) });
route.post("/reserva/agregar", verificarTokenPorRol([Roles.CLIENTE]), (req: Request, res: Response) => { reservaController.reservarCompra(req, res); });
route.patch("/reserva/eliminar/:id", verificarTokenPorRol([Roles.CLIENTE]), (req: Request, res: Response) => { reservaController.cancelarReservaPorId(req, res) });

export default route;
