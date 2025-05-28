import { Router } from 'express';
import recetaAPIController from '../../controllers/api/receta.api.Controller';
import multer from 'multer';
import path from 'path';
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
route.get('/recetas/:id', (req, res) => {
    recetaAPIController.buscarRecetasPorId(req, res);
});
// Ruta para editar producto con imagen
route.put('/recetaEditar/:id', upload.single('imagen'), (req, res) => {
    recetaAPIController.editarReceta(req, res);
});
route.post('/recetas', upload.single('imagen'), (res, req) => { recetaAPIController.crearReceta(res, req) })
route.delete('/recetas/:id', (res, req) => { recetaAPIController.delete(res, req) })

export default route;