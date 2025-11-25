const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/reporte.controller');

router.get('/diario', auth(), ctrl.diario);

module.exports = router;
