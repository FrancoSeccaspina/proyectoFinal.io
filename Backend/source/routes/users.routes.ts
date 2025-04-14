import express from 'express';
import usersController from '../controllers/usersController';

const route = express.Router();

route.get('/form', (req, res) => { 
    res.render('register');
});

route.get('/show/:id', (req, res) => { usersController.show(req, res) });
route.post('/save', (req, res) => { usersController.save(req, res) });

export default route;
