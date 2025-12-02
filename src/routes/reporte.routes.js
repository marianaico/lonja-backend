const router = require("express").Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/reporte.controller");

router.post("/diarios/add", auth(), ctrl.crearDiario);
router.get("/diario", auth(), ctrl.diario);
router.get("/semanal", auth(), ctrl.semanal);

module.exports = router;

