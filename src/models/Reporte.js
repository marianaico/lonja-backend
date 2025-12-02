const mongoose = require("mongoose");

const VentaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true }
});

const ReporteSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  ventas: { type: [VentaSchema], required: true },
  total: { type: Number, required: true }
});

module.exports = mongoose.model("Reporte", ReporteSchema);





