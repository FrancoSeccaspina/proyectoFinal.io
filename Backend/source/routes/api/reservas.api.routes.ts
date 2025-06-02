import { Router, Request, Response } from 'express'
import reservaApiController from '../../controllers/api/reserva.api.Controller';

const route = Router();

route.get("/reservas/mostrar", (req: Request, res: Response) => {
    reservaApiController.listaProductos(req, res)
})

export default route;