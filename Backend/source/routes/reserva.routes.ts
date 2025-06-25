import { Router, Request, Response } from "express";
import { verificarTokenPorRol } from '../middlewares/verificarToken';
import { Roles } from '../constants/roles';
import reservaController from '../controllers/reservaController'

const route = Router();

// Rutas del reservas
route.use(verificarTokenPorRol([Roles.CLIENTE]));
route.get("/reserva/mostrar/ultimaReserva", (req: Request, res: Response) => { reservaController.mostrarUltimaReserva(req, res) });
route.get("/reserva/mostrar/reserva/:id", (req: Request, res: Response) => { reservaController.mostrarReservaPorId(req, res) });
route.get("/reserva/mostrar/reservas", (req: Request, res: Response) => { reservaController.mostrarReservas(req, res) });
route.post("/reserva/agregar", (req: Request, res: Response) => { reservaController.reservarCompra(req, res); });
route.patch("/reserva/eliminar/:id", (req: Request, res: Response) => { reservaController.cancelarReservaPorId(req, res) });

export default route;
