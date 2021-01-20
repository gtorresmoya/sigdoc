const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let objSchema = new Schema({
    area_id: {
        type: Schema.Types.ObjectId,
        ref: 'Area'
    },
    tipodocumento_id: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDocumento'
    }
});

objSchema.plugin(
    uniqueValidator, {
        message: '{PATH} debe ser único'
    }
);

module.exports = mongoose.model('AreaTipoDoc', objSchema);