import { Router } from 'express';
import usuariosAPIController from '../../controllers/api/usuarios.api.controller';
const route = Router();


route.get('/usuarios', usuariosAPIController.listaUsuarios.bind(usuariosAPIController));

export default route;