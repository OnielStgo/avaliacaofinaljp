const serviceFilmeLocado = require("../services/serviceFilmeLocado")

class ControllerFilmeLocado {

  async LocarFilme(request, response) {
    try {
      const { idCliente, idFilme, datalocacao, datadevolucao } = request.body
      await serviceFilmeLocado.LocarFilme(idCliente, idFilme, datalocacao, datadevolucao )
      response.status(201).json({msg: "Filme alocado com sucesso"})
    } catch (error) {
      console.log(error)
      response.status(500).send({ msg: error.message })
    }
  }

  async DevolverFilme(request, response) {
    try {
      const { idCliente, idFilme } = request.body
      await serviceFilmeLocado.DevolverFilme(idCliente, idFilme )
      response.status(201).json({msg: "Filme devolvido com sucesso"})
    } catch (error) {
      response.status(500).send({ msg: error.message })
    }
  }
}

module.exports = new ControllerFilmeLocado()