import express from 'express';
import { Request, Response } from "express";
import usersController from '../controllers/usersController';
import validationLogin from '../validations/login';
import validationRegister from '../validations/register';


const route = express.Router();

route.get('/users/form', (req, res) => {
    res.render('register');
});
route.get('/users/show/:id', (req, res) => { usersController.show(req, res) });
route.delete('/users/:id', (req, res) => { usersController.softDelete(req, res) });
route.put('/users/:id', (req, res) => { usersController.update(req, res) });
route.post('/users/save', validationRegister, (req:Request, res:Response) => { usersController.save(req, res) });
route.post('/users/login', validationLogin, (req:Request, res:Response) => { usersController.login(req, res) });
route.get('/users/logout', (req, res) => { usersController.logout(req, res) });

export default route;
