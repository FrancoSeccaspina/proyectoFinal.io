import { Router, Request, Response } from "express";
import reservaController from '../controllers/reservaController'
import { autenticarToken } from '../middlewares/verificarToken';

const route = Router();

// Rutas del reservas
route.get("/reserva/mostrar/ultimaReserva", autenticarToken, (req: Request, res: Response) => { reservaController.mostrarUltimaReserva(req, res) });
route.get("/reserva/mostrar/reserva/:id", autenticarToken, (req: Request, res: Response) => { reservaController.mostrarReservaPorId(req, res) });
route.get("/reserva/mostrar/reservas", autenticarToken, (req: Request, res: Response) => { reservaController.mostrarReservas(req, res) });
route.post("/reserva/agregar", autenticarToken, (req: Request, res: Response) => { reservaController.reservarCompra(req, res); });
route.patch("/reserva/eliminar/:id", autenticarToken, (req: Request, res: Response) => { reservaController.cancelarReservaPorId(req, res) });

export default route;
