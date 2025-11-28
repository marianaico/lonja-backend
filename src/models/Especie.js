const { Schema, model, Types } = require('mongoose');

const EspecieSchema = new Schema({
  nombre: { type: String, required: true },
  tipo: { type: Types.ObjectId, ref: 'Tipo', required: true }
}, { timestamps: true });

EspecieSchema.index({ nombre: 1, tipo: 1 }, { unique: true });

module.exports = model('Especie', EspecieSchema);
