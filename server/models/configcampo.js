const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let objSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },
    valor: {
        type: String,
        required: [true, 'El valor es requerido'],
        unique: true
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

objSchema.virtual('confTDoc', {
    ref: 'ConfigTipoDoc', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'configcampo_id', // is equal to foreignField
});

module.exports = mongoose.model('ConfigCampo', objSchema);