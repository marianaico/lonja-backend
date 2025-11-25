const Compra = require('../models/Compra');

exports.diario = async (req, res, next) => {
  try {
    const { fecha } = req.query;
    if (!fecha) return res.status(400).json({ message: 'fecha requerida (YYYY-MM-DD)' });
    const inicio = new Date(`${fecha}T00:00:00.000Z`);
    const fin = new Date(`${fecha}T23:59:59.999Z`);

    const data = await Compra.aggregate([
      { $match: { fecha: { $gte: inicio, $lte: fin } } },
      { $lookup: { from: 'compradors', localField: 'comprador', foreignField: '_id', as: 'comprador' } },
      { $unwind: '$comprador' },
      { $lookup: { from: 'especies', localField: 'especie', foreignField: '_id', as: 'especie' } },
      { $unwind: '$especie' },
      { $group: {
        _id: { comprador: '$comprador.codigoCmp', especie: '$especie.nombre' },
        totalMonto: { $sum: '$precioTotal' },
        compras: { $sum: 1 }
      }},
      { $group: {
        _id: '$_id.comprador',
        detalle: { $push: { especie: '$_id.especie', totalMonto: '$totalMonto', compras: '$compras' } },
        totalComprador: { $sum: '$totalMonto' }
      }},
      { $sort: { _id: 1 } }
    ]);

    res.json({ fecha, data });
  } catch (e) { next(e); }
};
