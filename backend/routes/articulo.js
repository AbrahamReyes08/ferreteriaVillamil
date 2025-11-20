var router = require("express").Router();

const articuloCtrl = require("../controllers/articulo");

router.post('/new', articuloCtrl.nuevoArticulo);
router.put('/edit/:codigo', articuloCtrl.editArticulo);
router.get('/low-stock', articuloCtrl.lowStockItems);
router.get('/list', articuloCtrl.getAllItems);


module.exports = router;