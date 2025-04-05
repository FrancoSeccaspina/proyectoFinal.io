const middleware = (req,res,next) =>{
    if(req.session.user.perfil == 'Admin'){
        return next()
    }

    return res.redirect('/')
}

module.exports = middleware