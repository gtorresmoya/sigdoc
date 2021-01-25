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
    }
}, {
    timestamps: true
});

objSchema.plugin(
    uniqueValidator, {
        message: '{PATH} debe ser único'
    }
);

// Set Object and Json property to true. Default is set to false
objSchema.set('toObject', { virtuals: true });
objSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ConfigTipoDoc', objSchema);