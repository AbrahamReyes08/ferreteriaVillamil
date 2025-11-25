var router = require("express").Router();
const calificacionCtrl = require("../controllers/calificacion");

router.get("/list", calificacionCtrl.getAllCalificaciones);

module.exports = router;
