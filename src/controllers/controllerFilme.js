const serviceFilme = require("../services/serviceFilme")

class ControllerFilme {

  async GetFilmes(request, response) {
    try {
      const filmes = await serviceFilme.GetFilmes()
      response.status(200).json(filmes)
    } catch (error) {
      response.status(500).json({msg: error.message})
    }
  }

  async GetOneFilme(request, response) {
    try {
      const id = request.params.id
      const filme = await serviceFilme.GetOneFilme(id)
      response.status(200).json({msg: filme})
    } catch (error) {
      response.status(500).send({msg: error.message})
    }
  }

  async CreateFilme(request, response) {
    try {
      const { titulo, faixaEtaria, diretor } = request.body
      const filme = await serviceFilme.CreateFilme(titulo, faixaEtaria, diretor)
      response.status(201).json({msg: filme})
    } catch (error) {
      response.status(500).send({ msg: error.message })
    }
  }

  async UpdateFilme(request, response) {
    try {
      const id = request.params.id
      const { titulo, faixaEtaria, diretor } = request.body
      await serviceFilme.UpdateFilme(id, titulo, faixaEtaria, diretor)
      response.status(200).json({msg: "Filme atualizado com sucesso"})
    } catch (error) {
      response.status(500).json({msg: error.message})
    }
  }

  async DeleteFilme(request, response) {
    try {
      const id = request.params.id
      await serviceFilme.DeleteFilme(id)
      response.status(200).json({msg: "Filme deletado com sucesso"})
    } catch (error) {
      response.status(500).json({msg: error.message})
    }
  }
}

module.exports = new ControllerFilme()