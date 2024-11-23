const { Router } = require('express')
const controllerFilme = require('../controllers/controllerFilme.js')
const auth = require('../middleware/auth')

const router = Router()

router.get('/api/v1/filme', auth, controllerFilme.GetFilmes)
router.get('/api/v1/filme/:id', auth, controllerFilme.GetOneFilme)

router.post('/api/v1/filme', auth, controllerFilme.CreateFilme)
router.put('/api/v1/filme/:id', auth, controllerFilme.UpdateFilme)
router.delete('/api/v1/filme/:id', auth, controllerFilme.DeleteFilme)

module.exports = router