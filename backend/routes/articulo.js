var router = require("express").Router();

const articuloCtrl = require("../controllers/articulo");

router.post('/new', articuloCtrl.nuevoArticulo);
router.put('/edit/:codigo', articuloCtrl.editArticulo);
router.get('/low-stock', articuloCtrl.lowStockItems);
router.get('/list', articuloCtrl.getAllItems);
router.get('/code/:codigo', articuloCtrl.getItemByID);
router.delete('/delete/:codigo', articuloCtrl.deleteItem);
router.get('/list/active', articuloCtrl.getAllActiveItems);


module.exports = router;