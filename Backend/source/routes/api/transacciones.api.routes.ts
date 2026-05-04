import { Router, Response } from "express"
import transaccionApiController from '../../controllers/api/transaccion.api.Controller'

const route = Router();

route.get('/transacciones', (res: Response) => { transaccionApiController.listaTransacciones(res) });

export default route;
