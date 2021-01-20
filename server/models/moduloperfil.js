const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let objSchema = new Schema({
    perfil_id: {
        type: Schema.Types.ObjectId,
        ref: 'Perfil'
    },
    modulo_id: {
        type: Schema.Types.ObjectId,
        ref: 'Modulo'
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

module.exports = mongoose.model('ModuloPerfil', objSchema);