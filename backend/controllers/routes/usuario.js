const router = require('express').Router();
const usuarioController = require('../usuarioController');


router.post('/usuarios/registrar', usuarioController.createUsuario);
router.get('/usuarios', usuarioController.getUsuario);
router.get('/usuarios/:id', usuarioController.getUsuarioById);
module.exports = router;