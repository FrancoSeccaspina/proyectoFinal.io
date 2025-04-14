import express from 'express';
import usersController from '../controllers/usersController';
const registerValidator = require('../validations/register')

const route = express.Router();

route.get('/users/form', (req, res) => { 
    res.render('register');
});

route.get('/users/show/:id', (req, res) => { usersController.show(req, res) });
route.post('/users/save', registerValidator, (req, res) => { usersController.save(req, res) });
// route.post('/register/save', (req, res) => { usersController.register(req, res) });

// route.get('/register', (req, res) => { usersController.register(req, res) });


export default route;
