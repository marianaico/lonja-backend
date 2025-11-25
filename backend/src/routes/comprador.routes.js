const router = require('express').Router();
const auth = require('../middleware/auth');
const validate = require('../utils/validate');
const { compradorSchema } = require('../controllers/schemas');
const ctrl = require('../controllers/comprador.controller');

router.get('/', auth(), ctrl.list);
router.get('/:id', auth(), ctrl.get);
router.post('/', auth(['admin']), validate(compradorSchema), ctrl.create);
router.put('/:id', auth(['admin']), validate(compradorSchema), ctrl.update);
router.delete('/:id', auth(['admin']), ctrl.remove);

module.exports = router;
