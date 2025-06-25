import recetaAPIController from '../../controllers/api/receta.api.Controller';
import multer from 'multer';
import path from 'path';
import { verificarTokenPorRol } from '../../middlewares/verificarToken';
import { Roles } from '../../constants/roles';
import { Router } from 'express';

const route = Router();

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

route.get('/recetas', recetaAPIController.listarRecetas.bind(recetaAPIController));
route.get('/recetas/:id', (req, res) => { recetaAPIController.buscarRecetasPorId(req, res); });

route.put('/recetaEditar/:id', verificarTokenPorRol([Roles.ADMIN]), upload.single('imagen'), (req, res) => { recetaAPIController.editarReceta(req, res); });
route.post('/recetas', verificarTokenPorRol([Roles.ADMIN]),upload.single('imagen'), (res, req) => { recetaAPIController.crearReceta(res, req) })
route.delete('/recetas/:id', verificarTokenPorRol([Roles.ADMIN]), (res, req) => { recetaAPIController.delete(res, req) })

export default route;