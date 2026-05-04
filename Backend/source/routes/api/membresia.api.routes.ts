import { Router, Request, Response } from 'express'
import  membresiaApiController from '../../controllers/api/membresia.api.Controller';

const route = Router();

route.get("/membresias", (req: Request, res: Response) => {
    membresiaApiController.listaMembresias(req, res)
})

export default route;