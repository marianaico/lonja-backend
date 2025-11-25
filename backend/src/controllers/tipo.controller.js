const Tipo = require('../models/Tipo');

exports.list = async (req, res, next) => {
  try { res.json(await Tipo.find().sort({ nombre: 1 })); } catch (e) { next(e); }
};
exports.get = async (req, res, next) => {
  try {
    const t = await Tipo.findById(req.params.id);
    if (!t) return res.status(404).json({ message: 'No encontrado' });
    res.json(t);
  } catch (e) { next(e); }
};
exports.create = async (req, res, next) => {
  try { res.status(201).json(await Tipo.create(req.body)); } catch (e) { next(e); }
};
exports.update = async (req, res, next) => {
  try {
    const t = await Tipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!t) return res.status(404).json({ message: 'No encontrado' });
    res.json(t);
  } catch (e) { next(e); }
};
exports.remove = async (req, res, next) => {
  try {
    const r = await Tipo.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: 'No encontrado' });
    res.json({ ok: true });
  } catch (e) { next(e); }
};
