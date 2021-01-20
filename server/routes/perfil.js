const express = require('express');
const _ = require('underscore');
const Perfil = require('../models/perfil');

const { verificaToken, verificaAdminRole } = require('../middleware/authentication');
const app = express();

app.post('/api/perfil', [verificaToken, verificaAdminRole], (req, res) => {
    let body = req.body;
    let perfil = new Perfil({
        nombre: body.nombre
    });
    perfil.save((err, perfilDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!perfilDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            perfil: perfilDB
        });
    });
});

module.exports = app;