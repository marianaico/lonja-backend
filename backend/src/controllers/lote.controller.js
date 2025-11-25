const Lote = require('../models/Lote');

exports.list = async (req, res, next) => {
  try {
    const { fecha } = req.query;
    const filter = {};
    if (fecha) {
      const start = new Date(`${fecha}T00:00:00.000Z`);
      const end = new Date(`${fecha}T23:59:59.999Z`);
      filter.fecha = { $gte: start, $lte: end };
    }
    const data = await Lote.find(filter).sort({ fecha: -1 });
    res.json(data);
  } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const d = await Lote.findById(req.params.id);
    if (!d) return res.status(404).json({ message: 'No encontrado' });
    res.json(d);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try { res.status(201).json(await Lote.create(req.body)); } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const d = await Lote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!d) return res.status(404).json({ message: 'No encontrado' });
    res.json(d);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const r = await Lote.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: 'No encontrado' });
    res.json({ ok: true });
  } catch (e) { next(e); }
};
