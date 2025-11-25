const { Schema, model, Types } = require('mongoose');

const CompraSchema = new Schema({
  lote: { type: Types.ObjectId, ref: 'Lote', required: true },
  especie: { type: Types.ObjectId, ref: 'Especie', required: true },
  tipo: { type: Types.ObjectId, ref: 'Tipo', required: true },
  comprador: { type: Types.ObjectId, ref: 'Comprador', required: true },
  precioTotal: { type: Number, required: true, min: 0 },
  fecha: { type: Date, required: true, index: true }
}, { timestamps: true });

CompraSchema.index({ fecha: 1, comprador: 1 });

module.exports = model('Compra', CompraSchema);
