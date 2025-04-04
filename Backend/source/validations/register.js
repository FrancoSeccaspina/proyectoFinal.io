const { body } = require('express-validator')
let db = require('../database/models/index')


        
let mail = body('mail').notEmpty().withMessage('E-Mail no puede quedar vacio').bail().isEmail().custom(function(usuario,{req}){
    return db.usuario.findOne({where:
    {
        mail: req.body.mail
    }}).then(function(data){
        if(data){
            return Promise.reject('used email')
        }else{
            return true
        }
    })
}).withMessage('Email ya registrado')
let contrasenia = body('contrasenia').notEmpty().withMessage('Por favor, ingrese su contraseña').bail().isLength({min:6}).withMessage('Al menos 10 caracteres')

let usuario = body('usuario').notEmpty().withMessage('El nombre de usuario no puede quedar vacío').
custom(function(usuario){
   return db.usuario.findOne({where:
    {
        usuario: usuario
    }}).then(function(data){
        if(data){
            throw new Error('used user')
        }else{
            return true
        }
    })
}).withMessage('Usuario ya registrado').bail()
.isLength({min:5,max:20}).withMessage('minimo 5 caracteres, maximo 20')

let apellido = body('apellido').notEmpty().withMessage('El nombre de usuario no puede quedar vacío').
custom(function(usuario){
   return db.usuario.findOne({where:
    {
        usuario: usuario
    }}).then(function(data){
        if(data){
            throw new Error('used user')
        }else{
            return true
        }
    })
}).withMessage('Usuario ya registrado').bail()
.isLength({min:4})

const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ]
  
let imagen = body('imagen').custom(function(value,{req}){
         if(req.files && req.files.length > 0 && !whitelist.includes(req.files[0].mimetype)){
            return Promise.reject('Por favor que el archivo sea de tipo png, jpeg, jpg o webp')
         }else{
            return true
         }
})







let validaciones = [mail,contrasenia,usuario,apellido,imagen]

module.exports = validaciones;