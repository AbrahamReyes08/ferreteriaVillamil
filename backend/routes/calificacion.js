var router = require("express").Router();
const calificacionCtrl = require("../controllers/calificacion");

router.get("/list", calificacionCtrl.getAllCalificaciones);
router.post("/create", calificacionCtrl.createNewCalificacion);

module.exports = router;
