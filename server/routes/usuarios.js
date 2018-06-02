const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();


app.get('/usuario', function(req, resp) {

    let desde = Number(req.query.desde || 0);
    let limite = Number(req.query.limite || 0);


    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .limit(limite)
        .skip(desde)
        .exec((err, usuarios) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                resp.json({
                    ok: true,
                    usuarios,
                    total: conteo
                });
            });
        });
});
app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB,
        })
    })

    // if (body.nombre === undefined) {

    //     return es.status(400).json({
    //         ok: false,
    //         mensaj: "El nombre  es necesario"
    //     });

    // } else {
    //     res.json({
    //         ok: true,
    //         body
    //     });
    // }

});
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'img', 'role', 'estado', 'email']);



    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB,
        });
    });

});
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;