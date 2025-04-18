import { Router } from 'express';
import ejercicioController from '../controllers/ejercicioController';
const route = Router();

route.get('/ejercicios/:id', (req, res) => { ejercicioController.listaEjerciciosPorGrupoMuscular(req, res) });

export default route;