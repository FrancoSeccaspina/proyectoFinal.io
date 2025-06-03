import { Router, Request, Response } from 'express'
import reservaApiController from '../../controllers/api/reserva.api.Controller';

const route = Router();

route.get("/reservas/mostrar", (req: Request, res: Response) => {
    reservaApiController.listaProductos(req, res)
})
route.put("/reservas/confirmar/:id", (req: Request, res: Response) => { reservaApiController.confirmarReserva(req, res) });

export default route;