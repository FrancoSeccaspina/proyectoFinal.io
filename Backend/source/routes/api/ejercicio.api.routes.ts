import ejerciciosApiController from "../../controllers/api/ejercicio.api.Controller"
import multer from 'multer';
import path from 'path';
import { Router } from 'express';
import { Roles } from '../../constants/roles';
import { verificarTokenPorRol } from '../../middlewares/verificarToken';

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

route.get("/ejercicios", ejerciciosApiController.listaEjercicios.bind(ejerciciosApiController));
route.get('/ejercicios/:id', (req, res) => { ejerciciosApiController.buscarEjercicioPorId(req, res); });

route.post('/ejercicios', verificarTokenPorRol([Roles.ADMIN]), (res, req) => { ejerciciosApiController.crearEjercicio(res, req) })
route.delete('/ejercicios/:id', verificarTokenPorRol([Roles.ADMIN]), (res, req) => { ejerciciosApiController.delete(res, req) })
// Ruta para editar producto con imagen
route.put('/ejercicios/:id', verificarTokenPorRol([Roles.ADMIN]), upload.single('imagen'), (req, res) => { ejerciciosApiController.editarEjercicio(req, res); });

export default route;