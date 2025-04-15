import { Router } from 'express';
import grupoMuscularController from '../controllers/grupo_muscularesController';
const route = Router();



route.get('/gruposMusculares', (req, res) => { grupoMuscularController.listaGrupoMuscular(req, res) });

export default route;