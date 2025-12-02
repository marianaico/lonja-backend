const router = require("express").Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/compra.controller");


router.post("/", auth(), ctrl.crearCompra);
router.get("/mis", auth(), ctrl.misCompras);


router.get("/admin/todas", auth("admin"), ctrl.todas);

module.exports = router;

