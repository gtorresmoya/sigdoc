const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    perfil: {
        type: Schema.Types.ObjectId,
        ref: 'Perfil',
        required: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    usuario: {
        type: String,
        required: [true, 'El usuario es necesario'],
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        required: false,
        default: false
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

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

usuarioSchema.plugin(
    uniqueValidator, {
        message: '{PATH} debe ser único'
    }
);

module.exports = mongoose.model('Usuario', usuarioSchema);