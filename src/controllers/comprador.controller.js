const Comprador = require('../models/Comprador');

exports.list = async (req, res, next) => {
  try {
    const { q = '', page = 1, limit = 20 } = req.query;
    const filter = q ? { $or: [
      { codigoCmp: new RegExp(q, 'i') },
      { nombre: new RegExp(q, 'i') },
      { correo: new RegExp(q, 'i') }
    ] } : {};
    const data = await Comprador.find(filter).skip((page - 1) * limit).limit(Number(limit)).sort({ codigoCmp: 1 });
    res.json(data);
  } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const data = await Comprador.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'No encontrado' });
    res.json(data);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const data = await Comprador.create(req.body);
    res.status(201).json(data);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const data = await Comprador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: 'No encontrado' });
    res.json(data);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const r = await Comprador.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: 'No encontrado' });
    res.json({ ok: true });
  } catch (e) { next(e); }
};
