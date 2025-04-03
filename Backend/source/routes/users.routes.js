const express = require('express');

const usersController = require('../controllers/users.controller');

const route = express.Router();

// const {resolve, extname} = require('path');

// const { existsSync, mkdirSync } = require('fs');

// const destination = function(req, file, cb){
//     let folder = resolve(__dirname, '..', '..', 'public', 'images', 'avatars');
   
//     if(!existsSync(folder))
//     {
//         mkdirSync(folder)
//     }
//     return cb(null, folder);
// }
// //nombre único a cada archivo que se suba
// const filename = function(req, file, cb){
//     let unique =  Date.now();
//     //console.log(file.fieldname)
//     //let name = file.fieldname + '-' + unique + extname(file.originalname);
//     let name = file.originalname;
   
//     return cb(null, name);
// }
//SI QUISIERA VALIDAR SI UNA IMAGEN TIENE EL MISMO NOMBRE CÓMO HAGO ESA VALIDACIÓN CON EL MULTER


// const multer = require('multer');
// const upload = multer({storage:multer.diskStorage({destination, filename})});

// const registerValidator = require('../validations/register')

// const editValidator = require('../validations/userEdit')

// const loginValidator = require('../validations/login')


// const isLogged = require('../middlewares/isLogged')
// const isAdmin = require('../middlewares/isAdmin')


// //PREGUNTA REGISTER SIEMPRE Y CUANDO NO ESTÉ LOGUEADO
// //PARA QUE SE PUEDA REGISTRAR

// route.get('/register', usersController.create)


route.post('/register/save',upload.any(), registerValidator, usersController.save)
// route.post('/register/save',usersController.save)

// route.get('/login', usersController.login)
// //route.get('/profile',usersController.profile)
// route.post('/login/access',loginValidator, usersController.access)




// route.get('/logOut', isLogged, usersController.logout)

route.get('/users/detail/:id', usersController.show)

// route.put('/users/:id', isLogged, usersController.show)

// route.get('/users/edit/:id', isLogged, usersController.edit);

// route.put('/users/update/:id', isLogged, isAdmin, upload.any(),editValidator,usersController.update);

// route.get('/users/update', isLogged,usersController.update)

// //Sólo el Admin puede ver todos los usuarios, en cambio el usuario puede actualizar y ver sus datos

// route.get('/users', isLogged, isAdmin, usersController.index)





/*

app.get("/register", function (req, res) {
    return res.render("register");
});*/
/*Permita el flujo de registro, login y logout de usuarios.
● Permita recordar al usuario para que pueda ingresar sin volverse a loguear.
● Tenga rutas accesibles solo por huéspedes (visitantes sin login).
● Tenga rutas accesible solo por usuarios (que hicieron login). */
/*
//QUITAR
route.get("/register", function (req, res) {
    res.sendFile(path.resolve(__dirname, './views/register.html'));
});

route.get("/login", function (req, res) {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});
route.get("/carrito", function (req, res) {
    res.sendFile(path.resolve(__dirname, './views/carrito.ejs'));
});
*/
module.exports = route;