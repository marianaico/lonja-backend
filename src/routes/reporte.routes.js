const router = require("express").Router();
const ctrl = require("../controllers/reporte.controller");

// Obtener reportes
router.get("/diario", ctrl.diario);

// Guardar reporte
router.post("/diarios/add", ctrl.crearDiario);

module.exports = router;


