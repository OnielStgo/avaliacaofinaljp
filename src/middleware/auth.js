require("dotenv").config();
const jwt = require('jsonwebtoken')

function auth(request, response, next) {
  const token = request.headers['authorization']
  if(!token) return response.status(400).json({msg: 'Token não informado'})
  
  jwt.verify(token, process.env.SEGREDO, (err, decoded) => {
    if(err) return response.status(400).json({msg: 'Tóken inválido'})
    // console.log(decoded)
    next()
  })
}

module.exports = auth