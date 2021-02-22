const express = require('express');
const _ = require('underscore');
const fileUpload = require('express-fileupload');
const Indice = require('../../models/indice');

const { verificaToken, verificaAdminRole } = require('../../middleware/authentication');
const app = express();

const endpoint = '/api/indice';
const objEndpoint = Indice;
const fs = require('fs');
/**
 * Endpoint que permite crear un nuevo Indice
 */
app.post(`${endpoint}`, [verificaToken, verificaAdminRole], (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No se ha seleccionado ningún archivo'
                }
            });
    }
    let archivo = req.files.archivo;
    //Extensiones permitidas
    let extensionValidas = ['png', 'jpg', 'gif', 'jpeg', 'pdf'];
    let nombreArchivo = archivo.name.split('.');
    let extension = nombreArchivo[nombreArchivo.length - 1];
    if (extensionValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son: ' + extensionValidas.join(','),
                ext: extension
            }
        });
    }

    let buff = fs.readFileSync(req.files.archivo.tempFilePath);
    var base64data = buff.toString('base64');

    let body = req.body;
    let obj = new objEndpoint({
        mscp1: body.mscp1,
        mscp2: body.mscp2,
        mscp3: body.mscp3,
        mscp4: body.mscp4,
        mscp5: body.mscp5,
        mscp6: body.mscp6,
        mscp7: body.mscp7,
        mscp8: body.mscp8,
        mscp9: body.mscp9,
        mscp10: body.mscp10,
        mscp11: body.mscp11,
        mscp12: body.mscp12,
        mscp13: body.mscp13,
        mscp14: body.mscp14,
        b64Doc: base64data
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
            indice: objDB
        });
    });
});

/**
 * Endpoint para extraer todos los Indice
 */
app.get(`${endpoint}`, verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    let limitePagina = req.query.limit || 5;
    let soloActivos = {
        activo: true
    };
    desde = Number(desde);
    limitePagina = Number(limitePagina);
    objEndpoint.find(soloActivos)
        .skip(desde)
        .limit(limitePagina)
        .exec((err, indices) => {
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
                    indices
                });
            });
        });
});

/**
 * Endpoint para obtener un Indice
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
            indice: objDB
        });
    });
});

/**
 * Endpoint para obtener realizar una búsqueda sobre uno o varios Indices
 */
app.get(`${endpoint}/search`, [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    objEndpoint.find(req.body, {}, (err, objDB) => {
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
            indice: objDB
        });
    });
});

/**
 * Endpoint para actualizar un Indice
 */
app.put(`${endpoint}/:id`, [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body);
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
            indice: objDB
        });
    });
});

/**
 * Endpoint para eliminar un Tipo Documento
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
            indice: objDB
        });
    });
});

module.exports = app;