const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let objSchema = new Schema({
    tipodocumento_id: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDocumento'
    },
    mscp1: {
        type: String,
        required: false,
        default: ''
    },
    mscp2: {
        type: String,
        required: false,
        default: ''
    },
    mscp3: {
        type: String,
        required: false,
        default: ''
    },
    mscp4: {
        type: String,
        required: false,
        default: ''
    },
    mscp5: {
        type: String,
        required: false,
        default: ''
    },
    mscp6: {
        type: String,
        required: false,
        default: ''
    },
    mscp7: {
        type: String,
        required: false,
        default: ''
    },
    mscp8: {
        type: String,
        required: false,
        default: ''
    },
    mscp9: {
        type: String,
        required: false,
        default: ''
    },
    mscp10: {
        type: String,
        required: false,
        default: ''
    },
    mscp11: {
        type: String,
        required: false,
        default: ''
    },
    mscp12: {
        type: String,
        required: false,
        default: ''
    },
    mscp13: {
        type: String,
        required: false,
        default: ''
    },
    mscp14: {
        type: String,
        required: false,
        default: ''
    },
    b64Doc: {
        type: Text,
        required: [true, 'Debe subir una imagen'],
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

module.exports = mongoose.model('Indice', objSchema);