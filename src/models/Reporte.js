const mongoose = require("mongoose");

const VentaSchema = new mongoose.Schema({
  producto: String,
  cantidad: Number,
  precio: Number,
  subtotal: Number
});

const ReporteSchema = new mongoose.Schema({
  fecha: { type: Date, required: true, unique: true },
  ventas: [VentaSchema],
  totalVentas: Number,
  compras: { type: Number, required: true }
});

module.exports = mongoose.model("Reporte", ReporteSchema);

