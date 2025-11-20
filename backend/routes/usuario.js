const router = require('express').Router();
const usuarioController = require('../controllers/usuario');

router.get('/usuarios', usuarioController.getUsuario);
router.get('/usuarios/:id', usuarioController.getUsuarioById);
router.post('/usuarios', usuarioController.createUsuario);
router.put('/usuarios/:id', usuarioController.updateUsuario);
router.delete('/usuarios/:id', usuarioController.softDeleteUsuario);

module.exports = router;