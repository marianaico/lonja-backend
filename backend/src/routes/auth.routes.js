const router = require('express').Router();
const validate = require('../utils/validate');
const { loginSchema } = require('../controllers/schemas');
const ctrl = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

router.post('/login', validate(loginSchema), ctrl.login);
router.post('/register', auth(['admin']), ctrl.register);

module.exports = router;
