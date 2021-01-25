const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let objSchema = new Schema({
    area: {
        type: Schema.Types.ObjectId,
        ref: 'Area',
        required: true
    },
    tipodocumento: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDocumento',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AreaTipoDoc', objSchema);