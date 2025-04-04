const db = require("../database/models/index");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const controlador = {
  // create: (req, res) => {

  //     return res.render('register',{oldData: {}})
  // },
  // index: function(req, res){
  //     let users = db.user.findAll().then(function(users){
  //         return res.render('users/adminUsers',{users:users})
  //     })
  // },
  // show: function(req, res){
  //     db.user.findOne({
  //         where:{
  //             id:req.params.id
  //         }
  //     }).then(function(user){
  //         if(user){
  //             return res.render('users/userDetail',{ user:user });
  //         }
  //         res.redirect('/')
  //     })
  //     /*let product = products.filter(product => product.sku == req.params.id);*/

  // },

  show: (req, res) => {
    console.log(db.Usuario);

    db.Usuario.findOne({
      where: { id: req.params.id },
    })
      .then((user) => {
        if (user) {
          // return res.render('users/userDetail',{ user:user });

          return res.status(200).json({
            success: true,
            message: "Usuario encontrado",
            user,
          });
        }
        // res.redirect('/')

        // Si el usuario no existe, respondemos con 404
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      })
      .catch((error) => {
        console.error("Error en show:", error);
        res.status(500).json({
          success: false,
          message: "Error interno del servidor",
        });
      });
  },

  save: (req, res) => {
    console.log("Save", req.body);
    const result = validationResult(req);

    if (result.isEmpty()) {
      console.log("User is empty");
      db.Usuario
        .create({
          apellido: req.body.apellido,
          nombre: req.body.nombre,
          edad: req.body.edad,
          mail: req.body.mail,
          contrasenia: bcryptjs.hashSync(req.body.contrasenia, 10),
          perfil: "User",
          fechaNacimiento: req.body.fechaNacimiento,
          imagen: req.body.imagen,

        })
        .then(function (user) {
          console.log(user);

          return res.status(200).json({
            success: true,
            message: "Usuario creado",
            user,
          });
        });
    } else {
      let errores = result.mapped();
      console.log("fallo");
      console.log("errores ;:    ", errores);

      return res.status(404).json({
        success: false,
        message: "Usuario no creado",
      });
    }
  },

  // edit: (req, res) => {

  //     db.user.findOne({
  //         where:{
  //             id:req.params.id
  //         }
  //     }).then(function(user){

  //         return res.render('users/userEdit', {
  //             user: user, oldData:{}})

  //     })
  // },
  update: (req, res) => {
      const result = validationResult(req);
      const success = data => res.redirect('/')
      const error = error => res.render(error)
      if(result.isEmpty()){

          db.Usuario.findByPk(req.params.id).then((data) => db.Usuario.update({

              apellido: req.body.apellido,
              nombre: req.body.nombre,
              edad: req.body.edad,
              mail: req.body.mail,
              contrasenia: bcryptjs.hashSync(req.body.contrasenia, 10),
              perfil: "User",
              fechaNacimiento: req.body.fechaNacimiento,
              imagen: req.body.imagen,

           },{
               where:{
                   id: req.params.id
               }
          })).then(success
          ).catch(error)

          console.log("usuario editado")

      }else{
          let errores = result.mapped();
          console.log('fallo');
          console.log('errores ;:    ',errores);
          return res.render('users/userEdit',{errors:errores,user: req.body})
      }
  },
  // remove: (req, res) => {
  //     const user = db.user.destroy({
  //         where:{
  //             id: req.body.id
  //         }
  //     })
  //     const success = data => res.redirect('/users')
  //     const error = error => res.render(error)
  //     return user.then(success).catch(error)
  // },
  // login:(req, res) => {
  //     errorEmail = ''
  //     return res.render('login',{oldDataLogin:{}},errorEmail)
  // },
  // access: (req, res) => {

  //     const result = validationResult(req);
  //     if(!result.isEmpty()){
  //         errores = result.mapped();
  //         return res.render('login',{
  //             errorEmail:{email:{msg:''}},
  //             oldDataLogin: req.body,
  //             errors: errores
  //         })
  //     }

  //     db.user.findOne({
  //             where:{
  //                 email:req.body.email
  //             }
  //         })
  //     .then(function(dato){

  //     if(dato){
  //         req.session.user = dato
  //         if(req.body.recordame){
  //             res.cookie('user',req.body.email,{maxAge: 1000*60000*3})

  //         }
  //          return res.redirect('/')
  //     }
  //     else{
  //         console.log('else')
  //         const result = validationResult(req);
  //         if(!result.isEmpty()){
  //             errores = result.mapped()
  //         // return  res.render('login', {errores:{email:'No estás registrado'}});
  //             return res.render('login',{
  //                 errorEmail:{email:{msg:'Not found'}},
  //                 oldDataLogin: req.body,
  //                 errors:errores
  //             })
  //         }
  //     }
  //     })

  // },
  // logout:(req, res) => {
  //     delete req.session.user
  //     res.cookie('user', req.body.email,{maxAge:-1})
  //     return res.redirect('/')
  //     //return res.back()
  // },
  // findEmail: (req, res) => {

  //     const user = db.user.findOne({
  //         where:{
  //             email:req.body.email
  //         }
  //     })
  //     const success = data => data
  //     const error = error => res.render(error)
  //     user.then(success).catch(error)

  // }
};

module.exports = controlador;
