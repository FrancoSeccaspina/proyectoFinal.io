import express from 'express';
import path from 'path';
import fs from 'fs';
import usersController from '../controllers/usersController';

// import registerValidator from '../validations/register';
// import loginValidator from '../validations/login';
// import isLogged from '../middlewares/isLogged';
// import isAdmin from '../middlewares/isAdmin';

const route = express.Router();

// Rutas

// Mostrar formulario de registro (comentada si no la tenés aún)
// route.get('/register', userController.create);

// Registrar usuario

// Login (comentada si no la tenés aún)
// route.get('/login', userController.login);
// route.post('/login/access', loginValidator, userController.access);

// Logout (comentada si no tenés `isLogged` aún)
// route.get('/logout', isLogged, userController.logout);

// Mostrar detalle de usuario por ID
// route.post('/register/save', usersController.save);
route.get('/detail/:id', (req, res) => { usersController.show(req, res) });

// route.get('/test', (req, res) => {
//     res.send('<h1>¡Ruta /test funcionando correctamente! ✅</h1>');
//   });


// Actualizar usuario (si tu controller tiene `update`)
// route.put('/users/update/:id', userController.update); // Asegurate de tener este método
// route.get('/users/update', userController.update); // ¿Esta línea tiene sentido? No parece una ruta válida

// Listado de todos los usuarios (solo admin)
// route.get('/users', isLogged, isAdmin, userController.index);


//Crea un usuario llamando al controlador usersController y usando la función create
route.post('/usuarios', (req, res) => { usersController.create(req, res) });



export default route;
