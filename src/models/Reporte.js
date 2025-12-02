const mongoose = require("mongoose");

const VentaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true }
});

const ReporteSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  ventas: { type: [VentaSchema], required: true }, // 👈 AQUÍ VA "ventas"
  total: { type: Number, required: true }          // 👈 AQUÍ VA "total"
});

module.exports = mongoose.model("Reporte", ReporteSchema);




