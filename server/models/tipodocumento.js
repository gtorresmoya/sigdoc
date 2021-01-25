const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let objSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es requerido']
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
    update_at: {
        type: Date,
        default: Date.now()
    },
    activo: {
        type: Boolean,
        default: true
    }
});

objSchema.plugin(
    uniqueValidator, {
        message: '{PATH} debe ser único'
    }
);

objSchema.virtual('areaTDoc', {
    ref: 'AreaTipoDoc', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'tipodocumento', // is equal to foreignField
});

objSchema.virtual('confTDoc', {
    ref: 'ConfigTipoDoc', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'tipodocumento_id', // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
objSchema.set('toObject', { virtuals: true });
objSchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model('TipoDocumento', objSchema);