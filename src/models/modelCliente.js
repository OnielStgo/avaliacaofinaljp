const database = require("../config/database");
const Filme = require("./modelFilme")
const ModelFilmeLocado = require("./modelFilmeLocado")

class ModelCliente {

  constructor() {

    this.model = database.db.define('clientes', {
      id: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      nome: {
        type: database.db.Sequelize.STRING,
        require: true
      },

      email: {
        type: database.db.Sequelize.STRING,
        require: true,
        unique: true
      },

      senha: {
        type: database.db.Sequelize.STRING,
        require: true,
      },
      
    })

    this.model.belongsToMany(Filme, {
      through: {
        model: ModelFilmeLocado,
        unique: false,
      },   
      constraint: true,                      
      foreignKey: 'idCliente'                 
    })

    Filme.belongsToMany(this.model, {
      through: {
        model: ModelFilmeLocado,
        unique: false,
      },   
      constraint: true,                      
      foreignKey: 'idFilme'                 
    })

    this.model.hasMany(ModelFilmeLocado, {foreignKey: 'idCliente'})
    ModelFilmeLocado.belongsTo(this.model, {foreignKey: 'idCliente'})
    Filme.hasMany(ModelFilmeLocado, {foreignKey: 'idFilme'})
    ModelFilmeLocado.belongsTo(Filme, {foreignKey: 'idFilme'})

  }
}

module.exports = new ModelCliente().model