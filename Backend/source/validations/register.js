const { body } = require('express-validator')
let db = require('../database/models/index')


        
let email = body('email')
.notEmpty()
.withMessage('E-Mail no puede quedar vacio')
.bail()
.isEmail()
.custom(function(user,{req}){
    return db.Autenticacion.findOne({where:
    {
        email: req.body.email
    }}).then(function(data){
        if(data){
            return Promise.reject('used email')
        }else{
            return true
        }
    })
}).withMessage('Email ya registrado')

let contrasenia = body('contrasenia')
.notEmpty()
.withMessage('Por favor, ingrese su contraseña')
.bail()
.isLength({min:6})
.withMessage('Al menos 10 caracteres')

let nombre = body('nombre')
.notEmpty()
.withMessage('El nombre de usuario no puede quedar vacío')
.bail()
.isLength({min:3,max:20})
.withMessage('minimo 5 caracteres, maximo 20')

let apellido = body('apellido')
.notEmpty()
.withMessage('El apellido de usuario no puede quedar vacío')
.bail()
.isLength({min:4})

const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ]
  
// let imagen = body('imagen').custom(function(value,{req}){
//          if(req.files && req.files.length > 0 && !whitelist.includes(req.files[0].mimetype)){
//             return Promise.reject('Por favor que el archivo sea de tipo png, jpeg, jpg o webp')
//          }else{
//             return true
//          }
// })

let validaciones = [email,contrasenia,nombre,apellido]

module.exports = validaciones;