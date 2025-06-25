import { verificarTokenPorRol } from '../middlewares/verificarToken';
import { Roles } from '../constants/roles';
import { Router } from 'express';
import ejercicioController from '../controllers/ejercicioController';
const route = Router();


route.get('/ejercicios', (req, res) => { ejercicioController.listaEjercicios(req, res) })
route.get('/ejercicios/:id', (req, res) => { ejercicioController.listaEjerciciosPorGrupoMuscular(req, res) });

route.use(verificarTokenPorRol([Roles.ADMIN]));
route.post('/ejercicios', (res, req) => { ejercicioController.crearEjercicio(res, req) })
route.put('/ejercicios/.id', (res, req) => { ejercicioController.editarEjercicio(res, req) })
route.delete('/ejercicios/:id', (res, req) => { ejercicioController.delete(res, req) })

export default route;