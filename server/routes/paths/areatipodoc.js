const express = require('express');
const _ = require('underscore');
const AreaTD = require('../../models/areatipodoc');

const { verificaToken, verificaAdminRole } = require('../../middleware/authentication');
const app = express();

const endpoint = '/api/area-tipodoc';
const objEndpoint = AreaTD;

/**
 * Endpoint que permite crear un nuevo Area Tipo Documento
 */
app.post(`${endpoint}`, [verificaToken, verificaAdminRole], (req, res) => {
    let body = req.body;
    let obj = new objEndpoint({
        area: body.a,
        tipodocumento: body.td
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
            atd: objDB
        });
    });
});

/**
 * Endpoint para extraer todos los Area Tipo Documento
 */
app.get(`${endpoint}`, verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    let limitePagina = req.query.limit || 5;
    let soloActivos = {
        activo: true
    };
    desde = Number(desde);
    limitePagina = Number(limitePagina);
    objEndpoint.find({})
        .skip(desde)
        .limit(limitePagina)
        .populate([{
                path: 'tipodocumento',
                select: 'nombre'
            },
            {
                path: 'area',
                select: 'nombre'
            }
        ])
        .exec((err, atds) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            objEndpoint.countDocuments({}, (err, conteo) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    cuantos: conteo,
                    atds
                });
            });
        });
});

/**
 * Endpoint para obtener un Area Tipo Documento por Area
 */
app.get(`${endpoint}/:a/:td`, [verificaToken, verificaAdminRole], (req, res) => {
    let a = req.params.a;
    let td = req.params.td;
    objEndpoint.findById({ area_id: a, tipodocumento_id: td }, (err, objDB) => {
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
            atd: objDB
        });
    });
});
/**
 * Endpoint para actualizar un Area Tipo Documento
 */
app.put(`${endpoint}/:a/:td`, [verificaToken, verificaAdminRole], (req, res) => {
    let a = req.params.a;
    let td = req.params.td;
    let body = _.pick(req.body, ['area_id', 'tipodocumento_id']);
    objEndpoint.findByIdAndUpdate([a, td], body, { new: true, runValidators: true }, (err, objDB) => {
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
            atd: objDB
        });
    });
});

/**
 * Endpoint para eliminar un Area Tipo Documento
 */

app.delete(`${endpoint}/:a/:td`, [verificaToken, verificaAdminRole], (req, res) => {
    let a = req.params.a;
    let td = req.params.td;
    //Borrado físico
    objEndpoint.findByIdAndRemove({ area_id: a, tipodocumento_id: td }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
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