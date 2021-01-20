const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let objSchema = new Schema({
    evento_id: {
        type: Schema.Types.ObjectId,
        ref: 'Evento'
    },
    usuario_id: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
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

module.exports = mongoose.model('LogEvento', objSchema);