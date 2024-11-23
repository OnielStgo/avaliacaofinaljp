const { Router } = require('express')
const controllerClientes = require('../controllers/controllerClientes.js')
const auth = require('../middleware/auth.js')

const router = Router()

router.post('/api/v1/cliente', controllerClientes.CreateCliente)
router.post('/api/v1/login', controllerClientes.Login)

router.get('/api/v1/cliente', auth, controllerClientes.GetClientes)
router.get('/api/v1/cliente/:id', auth, controllerClientes.GetOneCliente)

router.put('/api/v1/cliente/:id', auth, controllerClientes.UpdateCliente)
router.delete('/api/v1/cliente/:id', auth, controllerClientes.DeleteCliente)

module.exports = router