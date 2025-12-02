const router = require("express").Router();
const ctrl = require("../controllers/reporte.controller");

// SIN AUTENTICACIÓN PARA PRUEBA
router.post("/diarios/add", ctrl.crearDiario);
router.get("/diario", ctrl.diario);
router.get("/semanal", ctrl.semanal);

module.exports = router;

