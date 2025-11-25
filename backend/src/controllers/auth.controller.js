const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u) return res.status(401).json({ message: 'Credenciales inválidas' });
    const ok = await u.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Credenciales inválidas' });
    const token = jwt.sign({ sub: u._id, role: u.role, email: u.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, role: u.role });
  } catch (e) { next(e); }
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email ya registrado' });
    const u = await User.create({ email, password, role: role || 'user' });
    res.status(201).json({ id: u._id, email: u.email, role: u.role });
  } catch (e) { next(e); }
};
