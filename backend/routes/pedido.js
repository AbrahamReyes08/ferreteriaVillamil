var router = require("express").Router();

const userCtrl = require("../controllers/pedido.js");

router.post("/newPedido", userCtrl.createNewPedido);
router.get("/getAllPedidos", userCtrl.getAllPedidos);
router.delete("/deletePedido/:id", userCtrl.deletePedido);
router.put("/updatePedido/:id", userCtrl.updatePedido);
router.post("/:id/generar-codigo", userCtrl.mandarCodigoEntregado);
router.post("/:id/:codigo/validar-codigo", userCtrl.validarCodigoEntregado);

// Nuevas rutas para manejo de múltiples pedidos por repartidor
router.get("/repartidor/:id_repartidor/pedidos", userCtrl.getPedidosByRepartidor);
router.get("/repartidor/:id_repartidor/pedidos-activos", userCtrl.getPedidosActivosByRepartidor);

module.exports = router;
