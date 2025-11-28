const Especie = require('../models/Especie');

exports.list = async (req, res, next) => {
  try {
    const { tipo } = req.query;
    const filter = tipo ? { tipo } : {};
    const data = await Especie.find(filter).populate('tipo').sort({ nombre: 1 });
    res.json(data);
  } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const d = await Especie.findById(req.params.id).populate('tipo');
    if (!d) return res.status(404).json({ message: 'No encontrado' });
    res.json(d);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try { res.status(201).json(await Especie.create(req.body)); } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const d = await Especie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!d) return res.status(404).json({ message: 'No encontrado' });
    res.json(d);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const r = await Especie.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: 'No encontrado' });
    res.json({ ok: true });
  } catch (e) { next(e); }
};
