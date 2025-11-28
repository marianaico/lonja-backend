const Reporte = require('../models/Reporte');

// Consultar reportes diarios
exports.diario = async (req, res) => {
  try {
    const reportes = await Reporte.find();
    res.json(reportes);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener reportes" });
  }
};

// Crear reporte diario
exports.crearDiario = async (req, res) => {
  try {
    const { fecha, ventas, compras } = req.body;
    const nuevoReporte = new Reporte({ fecha, ventas, compras });
    await nuevoReporte.save();
    res.status(201).json({ message: "Reporte guardado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al guardar reporte" });
  }
};
