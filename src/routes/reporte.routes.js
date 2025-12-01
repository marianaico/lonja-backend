const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/reporte.controller');

router.get('/diario', auth(), ctrl.diario);


router.post('/diarios/add', auth(), ctrl.crearDiario);


module.exports = router;
