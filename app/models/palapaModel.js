const moongoose = require('mongoose');

const palapaSchema = moongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    capacidad:{
        type: Number,
        required: true
    },
    existencia:{
        type: Number,
        default: 10
    }
})

const palapaModel = moongoose.model('bebida', palapaSchema);

module.exports = palapaModel;