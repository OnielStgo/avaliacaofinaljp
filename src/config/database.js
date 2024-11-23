require("dotenv").config()
const { Sequelize } = require("sequelize");

console.log(process.env.DB_NAME)

class Database {
  constructor(){
    this.init()
  }

  init() {
    this.db = new Sequelize({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      dialect: process.env.DB_DIALECT,
      password: process.env.DB_PWD,
      logging: false
    })
  }
}

module.exports = new Database()