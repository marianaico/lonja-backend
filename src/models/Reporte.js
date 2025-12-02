const mongoose = require("mongoose");

const VentaSchema = new mongoose.Schema({
  producto: String,
  precio: Number
});

const ReporteSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  ventas: [VentaSchema],
  total: { type: Number, required: true }
});

module.exports = mongoose.model("Reporte", ReporteSchema);



