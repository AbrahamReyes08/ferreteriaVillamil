var router = require("express").Router();

const detallesCtrl = require("../controllers/detalles");

router.post("/new", detallesCtrl.nuevoDetalle);

module.exports = router;