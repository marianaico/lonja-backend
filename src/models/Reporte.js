const mongoose = require("mongoose");

const ReporteSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  ventas: { type: Number, required: true },
  compras: { type: Number, required: true }
});

module.exports = mongoose.model("Reporte", ReporteSchema);
