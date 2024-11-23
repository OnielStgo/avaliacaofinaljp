const database = require("../config/database");


class ModelFilmeLocado {

  constructor() {

    this.model = database.db.define('filmelocados', {
      id: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      datalocacao: {
        type: database.db.Sequelize.STRING,
        require: true
      },

      datadevolucao: {
        type: database.db.Sequelize.STRING,
        require: true,
      },
      
    })
  }
}

module.exports = new ModelFilmeLocado().model