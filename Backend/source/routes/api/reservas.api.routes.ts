import { Router, Request, Response } from 'express'
import reservaApiController from '../../controllers/api/reserva.api.Controller';

const route = Router();

route.get("/reservas/mostrar", (req: Request, res: Response) => {
    reservaApiController.listaReservas(req, res)
})
route.put("/reservas/confirmar/:id", (req: Request, res: Response) => { reservaApiController.confirmarReserva(req, res) });
route.put("/reservas/cancelar/:id", (req: Request, res: Response) => { reservaApiController.cancelarReserva(req, res) });
// routes/reservaApiRoutes.ts
route.get('/reservas/estadisticasPorProducto', reservaApiController.estadisticasPorProducto);

export default route;