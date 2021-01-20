const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let objSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es requerido']
    }
});

objSchema.plugin(
    uniqueValidator, {
        message: '{PATH} debe ser único'
    }
);

module.exports = mongoose.model('Evento', objSchema);