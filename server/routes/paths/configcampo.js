const express = require('express');
const _ = require('underscore');
const ConfigCampo = require('../../models/configcampo');

const { verificaToken, verificaAdminRole } = require('../../middleware/authentication');
const app = express();

const endpoint = '/api/config-campo';
const objEndpoint = ConfigCampo;

/**
 * Endpoint que permite crear un nuevo Config Campo
 */
app.post(`${endpoint}`, [verificaToken, verificaAdminRole], (req, res) => {
    let body = req.body;
    let obj = new objEndpoint({
        nombre: body.nombre,
        valor: body.valor
    });
    obj.save((err, objDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!objDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            area: objDB
        });
    });
});

/**
 * Endpoint para extraer todos los Config Campo
 */
app.get(`${endpoint}`, verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    let limitePagina = req.query.limit || 5;
    let soloActivos = {
        activo: true
    };
    desde = Number(desde);
    limitePagina = Number(limitePagina);
    objEndpoint.find(soloActivos, 'nombre valor')
        .skip(desde)
        .limit(limitePagina)
        .exec((err, areas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            objEndpoint.countDocuments(soloActivos, (err, conteo) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    cuantos: conteo,
                    areas
                });
            });
        });
});

/**
 * Endpoint para obtener un Config Campo
 */
app.get(`${endpoint}/:id`, [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    objEndpoint.findById(id, (err, objDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!objDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            area: objDB
        });
    });
});
/**
 * Endpoint para actualizar un Config Campo
 */
app.put(`${endpoint}/:id`, [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'valor', 'activo']);
    objEndpoint.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, objDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!objDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            area: objDB
        });
    });
});

/**
 * Endpoint para eliminar un Config Campo
 */

app.delete(`${endpoint}/:id`, [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;

    let cambiaEstado = {
        activo: false
    };
    objEndpoint.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, objDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!objDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            area: objDB
        });
    });
});

module.exports = app;