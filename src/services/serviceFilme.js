const modelFilme = require("../models/modelFilme.js");

class ServiceFilme {

  async GetFilmes() {
    const filmes = await modelFilme.findAll()
    if(filmes.length === 0) throw new Error('Não há filmes cadastrados')
    return filmes
  }

  async GetOneFilme(id) {
    const idFilme = +id
    if(isNaN(idFilme)) throw new Error('Id inválido')

    const filme = await modelFilme.findByPk(idFilme)
    if(!filme) throw new Error(`Filme com id ${idFilme} não encontrado`)

    return filme
  }

  async CreateFilme(titulo, faixaEtaria, diretor) {
    if(!titulo || !faixaEtaria || !diretor) throw new Error('Favor preencher todos os dados corretamente')
    const filme = await modelFilme.findOne({
      where: {titulo: titulo}
    })
    if(filme) throw new Error(`O titulo ${titulo} já está cadastrado no sistema`)

    const newFilme = await modelFilme.create({titulo, faixaEtaria, diretor})
    return newFilme
  }

  async UpdateFilme(id, titulo, faixaEtaria, diretor) {
    const idFilme = +id
    if(isNaN(id)) throw new Error('Id inválido')
    
    const filme = await modelFilme.findByPk(id)
    if(!filme) throw new Error(`Filme com id ${idFilme} não encontrado`)
    if(!titulo && !faixaEtaria && !diretor) throw new Error('Nenhum dado foi introduzido')
 
    
    if(titulo === filme.titulo){
      filme.faixaEtaria =  faixaEtaria || filme.faixaEtaria
      filme.diretor =  diretor || filme.diretor      
      await filme.save()
      return
    }
    
    if(titulo){
      const isTituloInUse = await modelFilme.findOne({
        where: {titulo: titulo}
      })

      if (isTituloInUse) {
        throw new Error(`O titulo ${titulo} já está cadastrado no sistema`)
      }
    }

    filme.titulo = titulo || filme.titulo
    filme.faixaEtaria =  faixaEtaria || filme.faixaEtaria
    filme.diretor =  diretor || filme.diretor
    
    await filme.save()
  }

  async DeleteFilme(id) {
    const idFilme = +id
    if(isNaN(idFilme)) throw new Error('Id inválido')

    const filme = await modelFilme.findByPk(idFilme)
    if(!filme) throw new Error(`Filme com id ${idFilme} não encontrado`)

    await filme.destroy()
  }
}

module.exports = new ServiceFilme()