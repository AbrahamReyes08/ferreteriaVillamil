const router = require("express").Router();
const usuarioController = require("../controllers/usuario");

router.get("/usuarios", usuarioController.getUsuario);
router.get("/usuarios/:id", usuarioController.getUsuarioById);
router.post("/usuarios", usuarioController.createUsuario);
router.put("/usuarios/:id", usuarioController.updateUsuario);
router.delete("/usuarios/:id", usuarioController.softDeleteUsuario);
router.post("/login", usuarioController.loginUsuario);
router.get("/usuarios/inicio-sesion/:correo/:clave", usuarioController.inicioSesionUsuario);
router.get("/repartidores/pedidos-activos", usuarioController.getRepartidoresConPedidosActivos);
router.get("/repartidores/:id/pedidos", usuarioController.getRepartidorConPedidos);

module.exports = router;
