const express = require('express');
const path = require('path');
const {port, start} = require('./modules/server')
const static = require('./modules/static')
const { join } = require('path');
const cors = require('cors')

//method-override agregamos los verbos put delete y patch
const method = require('method-override');
//Para instalar manejo de sessiones npm i express-session
//Lo usamos
const session = require('express-session');
const cookie = require('cookie-parser');
//const { cookie } = require('express-validator');

const app = express();
//const logger = require('morgan');
//const cookieParser = require('cookie-parser');
const publicPath = path.resolve(__dirname, '../public');
app.use(static(publicPath)) 

//Configuración para que funcione los ejs
app.set('views', join(__dirname, './views'));
app.set('view engine', 'ejs');

app.listen(port, start());

//Uso las sessiones
//app.use(session{})


//Middleware de aplicación
//Configuración del entorno de la aplicación para que pueda capturar la información
//express.urlencoded y express.json
app.use(express.urlencoded({extended:true}));
//app.use(logger('dev'));
app.use(express.json());
//app.use(cookieParser());

//Falta configurar los estilos

app.use(session({secret:'clave',
resave:true,
saveUninitialized: true}))

//Añade al request la propiedad cookies y al response el método cookie()
app.use(cookie()) //req.cookies obj literal las cookies 


//Debe estar antes del routes y será la forma de poder usar los métodos put path y delete
app.use(method('m'))

//----------------------
//Custom Middlewware
// app.use(require('./middlewares/user'))

//----------------------

// app.use(require('./routes/products.routes'));
app.use(require('./routes/users.routes'));

app.use(cors());

// app.use(require('./routes/api/products.api.routes'));
// app.use(require('./routes/api/users.api.routes'));
// app.use(require('./routes/api/categories.api.routes'));

//Devolver un cambio git stash -u
// app.get("/login", function(req,res){
//     return res.render("login");
// });

// app.get('/carrito', function(req,res){
//     return res.render("carrito");//RENDERIZADO

// });

// app.get('/paginaEnConstruccion', function(req,res){
//     return res.render("paginaEnConstruccion");//RENDERIZADO

// });

// app.get('/profile', function (req, res) {
//     return res.render("profile");//RENDERIZADO
// });

// //Configurar error 404 ruta no encontrada
// app.use((req, res, next)=>{
//     res.status(404).render('404')
// });

/*Código viejo
app.get ('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'));
});

app.get("/register", function (req, res) {
    res.sendFile(path.resolve(__dirname, './views/register.html'));
});

app.get("/login", function (req, res) {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});

app.post("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, './views/home.html'));
});
*/