const modelFilmeLocado = require("../models/modelFilmeLocado");
const modelCliente = require("../models/modelCliente");
const modelFilme = require("../models/modelFilme");

class serviceFilmeLocado {

  async LocarFilme(idCliente, idFilme, datalocacao, datadevolucao) {

    if(!idCliente && !idFilme && !datalocacao && !datadevolucao) throw new Error('Favor preencher todos os dados corretamente')

    const id = +idCliente
    if(isNaN(id)) throw new Error('Id do cliente inválido')
    
    const cliente = await modelCliente.findByPk(id)
    if(!cliente) throw new Error(`Cliente com id ${id} não encontrado`)

    const identificadorFilme = +idFilme
    if(isNaN(identificadorFilme)) throw new Error('Id do filme inválido')

    const filme = await modelFilme.findByPk(identificadorFilme)
    if(!filme) throw new Error(`Filme com id ${identificadorFilme} não encontrado`)
    if(filme.locado) throw new Error(`O filme com id: ${identificadorFilme} está locado atualmente`)
    filme.locado = true
    await filme.save()
    await modelFilmeLocado.create({idCliente, idFilme, datalocacao, datadevolucao})
    return
  }

  async DevolverFilme(idCliente, idFilme) {

    if(!idCliente && !idFilme ) throw new Error('Favor preencher todos os dados corretamente')

    const id = +idCliente
    if(isNaN(id)) throw new Error('Id do cliente inválido')
    
    const cliente = await modelCliente.findByPk(id)
    if(!cliente) throw new Error(`Cliente com id ${id} não encontrado`)

    const identificadorFilme = +idFilme
    if(isNaN(identificadorFilme)) throw new Error('Id do filme inválido')

    const filme = await modelFilme.findByPk(identificadorFilme)
    if(!filme) throw new Error(`Filme com id ${identificadorFilme} não encontrado`)
    if(!filme.locado) throw new Error(`Filme com id ${identificadorFilme} foi devolvido anteriormente`)    

    filme.locado = false
    await filme.save()
    return
  }

}

module.exports = new serviceFilmeLocado()