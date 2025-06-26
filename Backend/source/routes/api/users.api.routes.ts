import { Router } from 'express';
import { verificarTokenPorRol } from '../../middlewares/verificarToken'
import { Roles } from '../../constants/roles';
import usuariosAPIController from '../../controllers/api/usuarios.api.controller';
import multer from 'multer';
import path from 'path';



// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === 'aptomedico' ? 'uploads/aptoMedico' : 'public/images/avatars';
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + '_usuario_' + req.params.id + ext;
    cb(null, name);
  }
});

const upload = multer({ storage });
const route = Router();
// Rutas API
route.get('/usuarios', usuariosAPIController.listaUsuarios.bind(usuariosAPIController));

route.get('/usuarios/:id', (req, res) => {
  usuariosAPIController.buscarUsuarioPorId(req, res);
});

// Ruta para editar producto con imagen
route.put('/usuarioEditar/:id', upload.fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'aptomedico', maxCount: 1 }
  ]), (req, res) => {
    usuariosAPIController.update(req, res);
  });

route.delete('/usuarios/:id', (res, req) => { usuariosAPIController.delete(res, req) })

route.post('/usuariosChangePassword', (req, res) => {
  usuariosAPIController.changePassword(req, res);
}
);

export default route;