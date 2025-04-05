const db = require('../database/models/index');

//Es un middleware de aplicación
let middleware = (req, res, next) =>{
    let user = null
    // Alternativa 1 existe una cookie de usuario

    if(req.cookies && req.cookies.user){
        const user = db.user.findOne({
            where:{
                email: req.cookies.user
            }
        })
        console.log(user)
        const success = data => req.session.user = data
        const error = error => res.render(error)
        user.then(success).catch(error)
         
    }   

    // Alternativa 2 existe un usuario en sesssion
    if(req.session && req.session.user){
        user = req.session.user
    }

    res.locals.userLogged = user

    return next()
}

module.exports = middleware;