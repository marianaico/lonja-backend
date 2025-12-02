const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/reporte.controller');

router.get('/diario', auth(), ctrl.diario);
router.post('/diarios/add', auth(), ctrl.crearDiario);
router.get("/mensual/:anio/:mes", auth(), ctrl.reporteMensual);

module.exports = router;
