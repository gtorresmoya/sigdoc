const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let objSchema = new Schema({
    usuario_id: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    tipodocumento_id: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDocumento'
    },
    area_id: {
        type: Schema.Types.ObjectId,
        ref: 'Area'
    },
    edita: {
        type: Boolean,
        default: false
    },
    lee: {
        type: Boolean,
        default: false
    },
    elimina: {
        type: Boolean,
        default: false
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
    update_at: {
        type: Date,
        default: Date.now()
    }
});

objSchema.plugin(
    uniqueValidator, {
        message: '{PATH} debe ser único'
    }
);

module.exports = mongoose.model('UsuarioArea', objSchema);