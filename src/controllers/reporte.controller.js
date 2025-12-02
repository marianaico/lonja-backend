const Reporte = require('../models/Reporte');

// OBTENER REPORTES DIARIOS
exports.diario = async (req, res) => {
  try {
    const reportes = await Reporte.find().sort({ fecha: -1 });
    res.json(reportes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener reportes" });
  }
};

// CREAR REPORTE DIARIO
exports.crearDiario = async (req, res) => {
  try {
    const { fecha, ventas, compras } = req.body;

    // 🔒 VALIDACIONES
    if (!fecha || ventas === undefined || compras === undefined) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (ventas < 0 || compras < 0) {
      return res.status(400).json({ message: "Ventas y compras no pueden ser negativas" });
    }

    // ⚠️ EVITAR DUPLICAR FECHAS
    const existe = await Reporte.findOne({ fecha });
    if (existe) {
      return res.status(400).json({ message: "Ya existe un reporte para esta fecha" });
    }

    const nuevoReporte = new Reporte({
      fecha,
      ventas,
      compras
    });

    await nuevoReporte.save();

    res.status(201).json({
      message: "Reporte guardado correctamente",
      reporte: nuevoReporte
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al guardar reporte" });
  }
};
