const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let objSchema = new Schema({
    tipodocumento_id: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDocumento'
    },
    configcampo_id: {
        type: Schema.Types.ObjectId,
        ref: 'ConfigCampo'
    },
    campo: {
        type: String,
        required: false
    },
    activo: {
        type: Boolean,
        default: false
    },
    nombre: {
        type: String,
        required: false
    },
    posicion: {
        type: Number,
        default: 0
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

module.exports = mongoose.model('ConfigTipoDoc', objSchema);