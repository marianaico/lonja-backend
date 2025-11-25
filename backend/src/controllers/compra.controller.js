const Compra = require('../models/Compra');

exports.list = async (req, res, next) => {
  try {
    const { fecha, comprador, tipo, especie, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (fecha) {
      const start = new Date(`${fecha}T00:00:00.000Z`);
      const end = new Date(`${fecha}T23:59:59.999Z`);
      filter.fecha = { $gte: start, $lte: end };
    }
    if (comprador) filter.comprador = comprador;
    if (tipo) filter.tipo = tipo;
    if (especie) filter.especie = especie;

    const data = await Compra.find(filter)
      .populate('comprador especie tipo lote')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ fecha: -1 });

    res.json(data);
  } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const d = await Compra.findById(req.params.id).populate('comprador especie tipo lote');
    if (!d) return res.status(404).json({ message: 'No encontrado' });
    res.json(d);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try { res.status(201).json(await Compra.create(req.body)); } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const d = await Compra.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!d) return res.status(404).json({ message: 'No encontrado' });
    res.json(d);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const r = await Compra.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: 'No encontrado' });
    res.json({ ok: true });
  } catch (e) { next(e); }
};
