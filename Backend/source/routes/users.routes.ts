import express from 'express';
import { Request, Response } from "express";
import usersController from '../controllers/usersController';
import validationLogin from '../validations/login';
import validationRegister from '../validations/register';

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

route.get('/users/form', (req, res) => {
    res.render('register');
});
route.get('/users/show/:id', (req, res) => { usersController.show(req, res) });
route.delete('/users/:id', (req, res) => { usersController.softDelete(req, res) });
route.put('/users/:id', (req, res) => { usersController.update(req, res) });
route.post('/users/save', validationRegister, (req: Request, res: Response) => { usersController.registrar(req, res) });
route.post('/users/login', validationLogin, (req: Request, res: Response) => { usersController.login(req, res) });
route.get('/users/logout', (req, res) => { usersController.logout(req, res) });
route.post('/users/change-password', (req: Request, res: Response) => { usersController.changePassword(req, res) });
route.post('/users/:id', upload.fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'aptomedico', maxCount: 1 }
  ]), (req, res) => {
    usersController.update(req, res);
  });
  

export default route;
