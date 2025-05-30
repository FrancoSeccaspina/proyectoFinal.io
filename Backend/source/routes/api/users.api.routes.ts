import { Router } from 'express';
import usuariosAPIController from '../../controllers/api/usuarios.api.controller';
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

// Rutas API
route.get('/usuarios', usuariosAPIController.listaUsuarios.bind(usuariosAPIController));

route.get('/usuarios/:id', (req, res) => {
    usuariosAPIController.buscarUsuarioPorId(req, res);
});

// Ruta para editar producto con imagen
route.put('/usuarioEditar/:id', upload.single('imagen'), (req, res) => {
    usuariosAPIController.editarUsuario(req, res);
});

route.delete('/usuarios/:id', (res, req) => { usuariosAPIController.delete(res, req) })


export default route;