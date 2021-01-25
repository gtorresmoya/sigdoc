const jwt = require('jsonwebtoken');
const Perfil = require('../models/perfil');

// ============================
// Verificar Token
// ============================
let verificaToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no válido"
                }
            });
        }

        req.usuario = decode.usuario;
        next();
    });
};

// ============================
// Verificar AdminRole
// ============================
let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;
    Perfil.findById(usuario.perfil, (err, perfilDB) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Usuario no es Administrador"
                }
            });
        }

        if (!perfilDB) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Usuario no es Administrador"
                }
            });
        }

        if (!perfilDB.isAdmin) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Usuario no es Administrador"
                }
            });
        }

        next();
    });
};

// ============================
// Verificar AdminRole
// ============================
let verificaTokenURL = (req, res, next) => {

    let token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no válido"
                }
            });
        }

        req.usuario = decode.usuario;
        next();
    });
};

module.exports = {
    verificaToken,
    verificaAdminRole,
    verificaTokenURL
};