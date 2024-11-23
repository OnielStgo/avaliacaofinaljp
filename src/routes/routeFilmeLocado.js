const { Router } = require('express')
const controllerFilmeLocado = require('../controllers/controllerFilmeLocado')
const auth = require('../middleware/auth')

const router = Router()

router.post('/api/v1/fimes/locar', auth, controllerFilmeLocado.LocarFilme)
router.post('/api/v1/fimes/devolver', auth, controllerFilmeLocado.DevolverFilme)

module.exports = router