import { verificarTokenPorRol } from '../middlewares/verificarToken';
import { Request, Response } from "express";
import { Roles } from '../constants/roles';
import express from 'express';
import usersController from '../controllers/usersController';
import validationLogin from '../validations/login';
import validationRegister from '../validations/register';
import validationRecuperarContra from '../validations/recuperarContra';

import multer from 'multer';
import path from 'path';

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

const route = express.Router();

route.get('/usuarios/formulario', (req, res) => { res.render('register'); });
route.post('/usuarios/guardar', validationRegister, (req: Request, res: Response) => { usersController.registrar(req, res) });
route.post('/usuarios/iniciar-sesion', validationLogin, (req: Request, res: Response) => { usersController.login(req, res) });

route.get('/usuarios/mostrar/:id', verificarTokenPorRol([Roles.CLIENTE, Roles.ADMIN]), (req, res) => { usersController.show(req, res) });
route.get('/usuarios/cerrar-sesion', verificarTokenPorRol([Roles.CLIENTE, Roles.ADMIN]), (req, res) => { usersController.logout(req, res) });
route.get('/usuarios/cambiar-contrasena/:token', (req: Request, res: Response) => {
  usersController.renderChangePassword(req, res);
});
route.post('/usuarios/cambiar-contrasena/:token', validationRecuperarContra, (req: Request, res: Response) => { usersController.changePassword(req, res) });
route.post('/usuarios/actualizar-contrasena', (req: Request, res: Response) => { usersController.envioEmail(req, res) });
route.post('/usuarios/:id', verificarTokenPorRol([Roles.CLIENTE, Roles.ADMIN]), upload.fields([
  { name: 'imagen', maxCount: 1 },
  { name: 'aptomedico', maxCount: 1 }
]), (req, res) => {
  usersController.update(req, res);
});

route.delete('/usuarios/:id', verificarTokenPorRol([Roles.ADMIN]), (req, res) => { usersController.softDelete(req, res) });
route.put('/usuarios/:id', verificarTokenPorRol([Roles.ADMIN]), (req, res) => { usersController.update(req, res) });

export default route;
