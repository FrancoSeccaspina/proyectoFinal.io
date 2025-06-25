import { Router, Request, Response } from 'express'
import reservaApiController from '../../controllers/api/reserva.api.Controller';
import { verificarTokenPorRol } from '../../middlewares/verificarToken';
import { Roles } from '../../constants/roles';

const route = Router();

// routes/reservaApiRoutes.ts
route.get('/reservas/estadisticasPorProducto', reservaApiController.estadisticasPorProducto);

route.get("/reservas/mostrar", verificarTokenPorRol([Roles.ADMIN]), (req: Request, res: Response) => {reservaApiController.listaReservas(req, res)})
route.put("/reservas/confirmar/:id", verificarTokenPorRol([Roles.ADMIN]), (req: Request, res: Response) => { reservaApiController.confirmarReserva(req, res) });
route.put("/reservas/cancelar/:id", verificarTokenPorRol([Roles.ADMIN]), (req: Request, res: Response) => { reservaApiController.cancelarReserva(req, res) });

export default route;