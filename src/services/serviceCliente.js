require("dotenv").config();
const modelCliente = require("../models/modelCliente");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SALT = 10
class ServiceCliente {

  async GetClientes() {
    const clientes = await modelCliente.findAll()
    if(clientes.length === 0) throw new Error('Não há clientes cadastrados')
    return clientes
  }

  async GetOneCliente(id) {
    const idCliente = +id
    if(isNaN(idCliente)) throw new Error('Id inválido')

    const cliente = await modelCliente.findByPk(idCliente)
    if(!cliente) throw new Error(`Cliente com id ${idCliente} não encontrado`)

    return cliente
  }

  async CreateCliente(nome, email, senha) {
    if(!nome || !email || !senha ) throw new Error('Favor preencher todos os dados corretamente')
    const cliente = await modelCliente.findOne({
      where: {email: email}
    })
    if(cliente) throw new Error(`O email ${email} já está cadastrado no sistema`)

    const hashSenha = await bcrypt.hash(senha, SALT)
    return modelCliente.create({nome, email, senha: hashSenha})
  }

  async UpdateCliente(id, nome, email, senha) {
    const idCliente = +id
    if(isNaN(id)) throw new Error('Id inválido')
    
    const cliente = await modelCliente.findByPk(id)
    if(!cliente) throw new Error(`Cliente com id ${idCliente} não encontrado`)
    if(!nome && !email && !senha) throw new Error('Nenhum dado foi introduzido')


    if(email === cliente.email){
      cliente.nome = nome || cliente.nome
      cliente.senha = senha || cliente.senha     
      await cliente.save()
      return
    }

    if(email){
      const isEmailInUse = await modelCliente.findOne({
        where: {email: email}
      })

      if (isEmailInUse) {
        throw new Error(`O email ${email} já está cadastrado no sistema`)
      }
    }

    cliente.nome = nome || cliente.nome
    cliente.email = email || cliente.email
    cliente.senha = senha || cliente.senha
    await cliente.save()
  }

  async DeleteCliente(id){
    const idCliente = +id
    if(isNaN(idCliente)) throw new Error('Id inválido')

    console.log(idCliente)

    const cliente = await modelCliente.findByPk(idCliente)
    if(!cliente) throw new Error(`Cliente com id ${idCliente} não encontrado`)

    await cliente.destroy()
  }

  async Login(email, senha) {
    if(!email || !senha) throw new Error('Email ou senha inválidos')
    
    const cliente = await modelCliente.findOne({
      where: {email: email}
    })
    if(!cliente) throw new Error('Email ou senha inválidos')

    const isSenhaValid = await bcrypt.compare(senha, cliente.senha)
    if(!isSenhaValid) throw new Error('Email ou senha inválidos')
    
    const token = jwt.sign({id: cliente.id}, process.env.SEGREDO, {expiresIn: process.env.TIME_TO_EXPIRE})

    return token    
  }
}

module.exports = new ServiceCliente()