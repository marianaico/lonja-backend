const { Schema, model } = require('mongoose');

const LoteSchema = new Schema({
  numeroCajas: { type: Number, required: true, min: 0 },
  precioKgSalida: { type: Number, required: true, min: 0 },
  fecha: { type: Date, required: true, index: true }
}, { timestamps: true });

module.exports = model('Lote', LoteSchema);
