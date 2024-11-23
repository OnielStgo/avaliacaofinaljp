require("dotenv").config()
const express = require('express')
const routerCliente = require('./src/routes/routeCliente')
const routerFilmeLocado = require('./src/routes/routeFilmeLocado')
const routerFilme = require('./src/routes/routeFilme')
const database = require('./src/config/database')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routerCliente)
app.use(routerFilmeLocado)
app.use(routerFilme)

database.db
  .sync({force: false}) 
  .then(() => {
    console.log('Banco de dados conectado com sucesso')

    app.listen(process.env.PORT, () => {
      console.log(`Servidor correndo na porta ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log('Não foi possível conectar com o banco de dados')
  })

