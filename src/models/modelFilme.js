const database = require("../config/database");

class ModelFilme {

  constructor() {

    this.model = database.db.define('filmes', {
      id: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      titulo: {
        type: database.db.Sequelize.STRING,
        require: true,
        unique: true,
      },

      faixaEtaria: {
        type: database.db.Sequelize.STRING,
        require: true,
      },

      diretor: {
        type: database.db.Sequelize.STRING,
        require: true,
      },

      locado: {
        type: database.db.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      
    })
  }
}

module.exports = new ModelFilme().model