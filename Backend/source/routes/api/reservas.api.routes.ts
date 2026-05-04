import { Router, Request, Response } from 'express'
import reservaApiController from '../../controllers/api/reserva.api.Controller';
import { verificarTokenPorRol } from '../../middlewares/verificarToken';
import { Roles } from '../../constants/roles';

const route = Router();

// routes/reservaApiRoutes.ts
route.get('/reservas/estadisticas', verificarTokenPorRol([Roles.ADMIN]), reservaApiController.estadisticasPorProducto);
route.get("/reservas", verificarTokenPorRol([Roles.ADMIN]), (req: Request, res: Response) => {reservaApiController.listaReservas(req, res)})
route.patch("/reservas/:id/confirmar", verificarTokenPorRol([Roles.ADMIN]), (req: Request, res: Response) => { reservaApiController.confirmarReserva(req, res) });
route.patch("/reservas/:id/cancelar", verificarTokenPorRol([Roles.ADMIN]), (req: Request, res: Response) => { reservaApiController.cancelarReserva(req, res) });
route.delete('/reservas/:id_reserva', verificarTokenPorRol([Roles.ADMIN, Roles.CLIENTE]), (res, req) => { reservaApiController.delete(res, req) })
route.get("/reservas/:id", (req: Request, res: Response) => {reservaApiController.reservaPorId(req, res)});

export default route;
