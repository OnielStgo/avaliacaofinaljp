const serviceCliente = require("../services/serviceCliente")

class ControllerCliente {

  async GetClientes(request, response) {
    try {
      const clientes = await serviceCliente.GetClientes()      
      response.status(200).json(clientes)
    } catch (error) {
      response.status(500).json({msg: error.message})
    }
  }

  async GetOneCliente(request, response) {
    try {
      const id = request.params.id
      const cliente = await serviceCliente.GetOneCliente(id)
      response.status(200).json({msg: cliente})
    } catch (error) {
      response.status(500).send({msg: error.message})
    }
  }

  async CreateCliente(request, response) {
    try {
      const { nome, email, senha } = request.body

      const cliente = await serviceCliente.CreateCliente(nome, email, senha)
      response.status(201).json({msg: cliente})
    } catch (error) {
      response.status(500).send({ msg: error.message })
    }
  }

  async UpdateCliente(request, response) {
    try {
      const id = request.params.id
      const { nome, email, senha } = request.body
      await serviceCliente.UpdateCliente(id, nome, email, senha)
      response.status(200).json({msg: "Cliente atualizado com sucesso"})
    } catch (error) {
      response.status(500).json({msg: error.message})
    }
  }

  async DeleteCliente(request, response) {
    try {
      const id = request.params.id
      await serviceCliente.DeleteCliente(id)
      response.status(200).json({msg: "Cliente deletado com sucesso"})
    } catch (error) {
      response.status(500).json({msg: error.message})
    }
  }

  async Login(request, response) {
    try {
      const { email, senha } = request.body
      const token = await serviceCliente.Login(email, senha)
      response.status(200).json({token})      
    } catch (error) {
      response.status(500).json({msg: error.message})
    }
  }
}

module.exports = new ControllerCliente()