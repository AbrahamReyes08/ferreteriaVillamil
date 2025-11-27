var router = require("express").Router();

const estadisticasCtrl = require("../controllers/estadisticas");

router.get("/pedidos-por-estado", estadisticasCtrl.pedidosPorEstado);


module.exports = router;

