const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let objSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida']
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

module.exports = mongoose.model('Modulo', objSchema);