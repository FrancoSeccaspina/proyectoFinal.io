const { body } = require('express-validator')
const {all} = require('../models/products.model')
const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
  ]

let nombre = body('name').notEmpty().withMessage('El titulo no puede quedar vacío').isLength({min:5}).withMessage('el nombre debe contener al menos 5 caracteres')  
let price = body('price').notEmpty().withMessage('El precio no puede quedar vacío')

let description = body('description').notEmpty().withMessage('La descripción no puede quedar vacía').isLength({min:20}).withMessage('La descripción debe contener al menos 20 caracteres')

let imagen = body('image').custom(function(value,{req}){
         if(!req.files[0]){
            return Promise.reject('La imagen es obligatoria')
         }
         else if(!whitelist.includes(req.files[0].mimetype)){
            return Promise.reject('Por favor que el archivo sea de tipo png, jpeg, jpg o webp')
         }else{
            return true
         }
})
module.exports = [imagen,nombre,description,price]