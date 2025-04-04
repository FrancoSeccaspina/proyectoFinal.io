const { body, check } = require('express-validator')
const { compareSync } = require('bcryptjs')

const db = require('../database/models/index');
const { nextTick } = require('process');
const { cp } = require('fs');


let mail = body('mail').notEmpty().withMessage('E-Mail no puede quedar vacío').bail().isEmail().withMessage('Email no valido').bail()
let contrasenia = body('contrasenia').notEmpty().withMessage('Por favor, ingrese su contraseña').bail()

module.exports = [
    
    body('mail').custom(value => {
        return db.usuario.findOne({
            where:{
                mail: value
            }
        }).then(usuario => {
          if (!usuario) {
            return Promise.reject('Este email no está registrado');
          }else{
            return true
          }
        });
      }),
    body('contrasenia').notEmpty().withMessage('La contraseña no puede quedar vacia').bail().custom(function(usuario,{req}){
        return db.usuario.findOne({where:
        {
    
            mail: req.body.mail
        }}).then(function(data){     
            if(data){
                if(compareSync(req.body.contrasenia, data.contrasenia)){            
                    return true
                }else{
                    return Promise.reject('Las contraseñas no coinciden')
                }
            }
        })
    }).withMessage('La contraseña no coincide')

    
]  

/*if(!compareSync(password, user.password)){
    return true
}*/