const { Schema, model } = require('mongoose');

const TipoSchema = new Schema({
  nombre: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = model('Tipo', TipoSchema);
