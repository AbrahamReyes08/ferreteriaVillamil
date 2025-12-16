var router = require("express").Router();

const userCtrl = require("../controllers/pedido.js");

router.post("/newPedido", userCtrl.createNewPedido);
router.get("/getAllPedidos", userCtrl.getAllPedidos);
router.get("/:id", userCtrl.getPedidoById);
router.get("/:id/detalles", userCtrl.getDetallesPedido);
router.delete("/deletePedido/:id", userCtrl.deletePedido);
router.put("/updatePedido/:id", userCtrl.updatePedido);
router.post("/:id/generar-codigo", userCtrl.mandarCodigoEntregado);
router.post("/:id/:codigo/validar-codigo", userCtrl.validarCodigoEntregado);
router.get("/repartidor/:id_repartidor/pedidos", userCtrl.getPedidosByRepartidor);
router.get("/repartidor/:id_repartidor/pedidos-activos", userCtrl.getPedidosActivosByRepartidor);
router.post("/:id/asignar-repartidor", userCtrl.asignarRepartidor);
router.post("/:id/cancelar-envio", userCtrl.cancelarEnvio);
router.put("/:id/estado", userCtrl.updateEstadoPedido);
// Endpoint público para tracking de pedidos (sin autenticación)
router.get("/cliente/tracking/:id", userCtrl.getPedidoClienteTracking);
//Este comentario deberia arreglar el bug de sync con el repo

module.exports = router;
