// auth.js
const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('users');
var service = require('../libs/services');

function whois({nombre:_nombre, _id: __id}) { return {nombre:_nombre, _id: __id}}

router.post('/login', async (req, res) => {
    const user = req.body;

    if(!user.password || !user.correo) return res.status(400).send({'msj':'Informacion incomleta'});
    User.findOne({correo: user.correo.toLowerCase()}, (err, _user) => {
        console.log('too bien', user, _user);                                                               // Comprobar si hay errores
        if(err) return res.status(400).send({'msj':'Error al iniciar sesion'});                             // Si el usuario existe o no
        else if(_user === null) return res.status(400).send({'msj':'Usuario Incorrecto'});                  // Y si la contraseña es correcta
        else if(user.password != _user.password) return res.status(400).send({'msj':'Clave Incorrecta'});   // INFO CORRECTA
        else return res.status(200).send({token: service.createToken(user)});
    });
});
router.post('/sigin', async (req, res) => {
    const _user = req.body;
    var user = new User(_user);
    user.save((err, u)=>{
        return res
        .status(200)
        .send({token: service.createToken(user), user:whois(u)});
    });
});

module.exports = router;