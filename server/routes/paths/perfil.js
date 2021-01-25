const express = require('express');
const _ = require('underscore');
const Perfil = require('../../models/perfil');

const { verificaToken, verificaAdminRole } = require('../../middleware/authentication');
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

/**
 * Endpoint para extraer todos los Perfiles
 */
app.get('/api/perfil', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    let limitePagina = req.query.limit || 5;
    let soloActivos = {
        activo: true
    };
    desde = Number(desde);
    limitePagina = Number(limitePagina);
    Perfil.find(soloActivos, 'nombre isAdmin')
        .skip(desde)
        .limit(limitePagina)
        .exec((err, perfiles) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Perfil.countDocuments(soloActivos, (err, conteo) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    cuantos: conteo,
                    perfiles
                });
            });
        });
});

/**
 * Endpoint para obtener un perfil
 */
app.get('/api/perfil/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    Perfil.findById(id, (err, perfilDB) => {
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
/**
 * Endpoint para actualizar un perfil
 */
app.put('/api/perfil/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'img', 'role', 'estado']);
    Perfil.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, perfilDB) => {
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

/**
 * Endpoint para eliminar un Perfil
 */

app.delete('/api/perfil/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;

    let cambiaEstado = {
        activo: false
    };
    Perfil.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, perfilDB) => {
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