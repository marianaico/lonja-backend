const mongoose = require("mongoose");

const ReporteSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  ventas: [
    {
      nombre: String,
      precio: Number
    }
  ],
  total: { type: Number, required: true }
});

module.exports = mongoose.model("Reporte", ReporteSchema);






