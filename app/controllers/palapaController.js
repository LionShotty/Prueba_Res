const palapaModel = require('../models/palapaModel');

function buscarTodo(req, res){
    palapaModel.find({})
        .then(bebidas => {
            if (bebidas.length){
                return res.status(200).send({bebidas})
            }
            return res.status(204).send({message: 'No hay nada que mostrar :c'})
    })
    .catch(e => {return res.status(404).send({message: `Error al solicitar la información ${e}`})})
}

function agregar(req, res){
    new palapaModel(req.body).save()
        .then(info => {
            return res.status(200).send({
                message: 'La información se guardo con exito', info
            })
        })
        .catch(e=> { return res.status(404).send({
            message: `Error al guardar la información ${e}`
        })
    })
}

module.exports = {
    buscarTodo,
    agregar
}