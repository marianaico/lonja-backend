const { Schema, model } = require('mongoose');

const CompradorSchema = new Schema({
  codigoCmp: { type: String, required: true, unique: true, index: true },
  nombre: { type: String, required: true },
  apellidoPaterno: { type: String },
  apellidoMaterno: { type: String },
  direccion: { type: String },
  correo: { type: String, index: true }
}, { timestamps: true });

module.exports = model('Comprador', CompradorSchema);
