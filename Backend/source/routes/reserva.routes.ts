import { Router, Request, Response } from "express";
import reservaController from "../controllers/reservaController";

const router = Router();

// Rutas del reservas
router.get("/reserva/mostrar/ultimaReserva", (req: Request, res: Response) => {reservaController.mostrarUltimaReserva(req, res)});
router.get("/reserva/mostrar/reserva/:id", (req: Request, res: Response) => {reservaController.mostrarReservaPorId(req, res)});
router.get("/reserva/mostrar/reservas", (req: Request, res: Response) => {reservaController.mostrarReservas(req, res)});
router.post("/reserva/agregar", (req: Request, res: Response) => {reservaController.reservarCompra(req, res);});

export default router;
