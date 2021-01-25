const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let objSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es requerido']
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

objSchema.plugin(
    uniqueValidator, {
        message: '{PATH} debe ser único'
    }
);

objSchema.virtual('areaTDoc', {
    ref: 'AreaTipoDoc', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'area', // is equal to foreignField
});

module.exports = mongoose.model('Area', objSchema);