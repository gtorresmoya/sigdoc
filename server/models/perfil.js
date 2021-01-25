const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un Rol válido'
};

let Schema = mongoose.Schema;
let perfilSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        unique: true,
        enum: rolesValidos
    },
    isAdmin: {
        type: Boolean,
        default: false
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

perfilSchema.plugin(
    uniqueValidator, {
        message: '{PATH} debe ser único'
    }
);

module.exports = mongoose.model('Perfil', perfilSchema);