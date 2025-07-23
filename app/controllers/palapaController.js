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


// Cuando se ejecuta la funcion se ejecutan llaves y producto o caracteristica


function buscarBebida(req, res, next){
    let consulta = {}
    consulta[req.params.key] = req.params.value;
    console.log(consulta)
    palapaModel.find(consulta)
    // En caso sea correcto o hubiese informacion se muestra
    .then(bebidas =>{
        if(!bebidas.length) return next()
            req.body.bebidas = bebidas
        return next()
    })
    // Caso contrario da error
    .catch (e=>{
        req.body.e = e
        return next()
    })
}

    function mostrarBebida(req, res){
      if (req.body.e)
         return res.status(404).send({message: "Error al consultar la información"})  
        if(!req.body.bebidas) return res.status(204).send({message:"No hay información que mostrar"})
            let bebidas = req.body.bebidas
        return res.status(200).send({bebidas})
    }

  function eliminarBebida(req,res) {
    var bebidas = {}
    bebidas = req.body.bebidas
    palapaModel.deleteOne(bebidas[0])
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).send({ mensaje: "No se encontró la bebida para eliminar" });
            }
            return res.status(200).send({ mensaje: "La información se eliminó con éxito" });
        })
        .catch(e => {
            return res.status(500).send({ mensaje: "Error al eliminar el producto", e });
        });
}


function actualizarBebida(req, res) {
  const filtro = { [req.params.key]: req.params.value };
  const nuevosDatos = req.body;

  if (!Object.keys(nuevosDatos).length)
    return res.status(400).send({ message: "No hay datos para actualizar." });

  palapaModel.findOneAndUpdate(filtro, nuevosDatos, { new: true })
    .then(bebida => bebida
      ? res.status(200).send({ message: "Bebida actualizada", bebida })
      : res.status(404).send({ message: "Bebida no encontrada" })
    )
    .catch(e => res.status(500).send({ message: "Error al actualizar", error: e }));
}


module.exports = {
    buscarTodo,
    agregar,
    buscarBebida,
    mostrarBebida,
    eliminarBebida,
    actualizarBebida
}