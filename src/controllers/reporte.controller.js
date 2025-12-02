const Reporte = require("../models/Reporte");

// Guardar reporte diario
exports.crearDiario = async (req, res) => {
  try {
    const { fecha, ventas } = req.body;

    if (!fecha || !ventas || ventas.length === 0) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    let total = 0;
    ventas.forEach(v => total += v.precio);

    const nuevo = new Reporte({
      fecha,
      ventas,
      total
    });

    await nuevo.save();
    res.status(201).json(nuevo);

  } catch (error) {
    res.status(500).json({ message: "Error al guardar reporte" });
  }
};

// Obtener todos los reportes
exports.diario = async (req, res) => {
  try {
    const reportes = await Reporte.find().sort({ fecha: -1 });
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reportes" });
  }
};

// Reporte semanal
exports.semanal = async (req, res) => {
  const { inicio, fin } = req.query;

  try {
    const reportes = await Reporte.find({
      fecha: {
        $gte: new Date(inicio),
        $lte: new Date(fin)
      }
    });

    let totalSemana = 0;
    reportes.forEach(r => totalSemana += r.total);

    res.json({ reportes, totalSemana });

  } catch (error) {
    res.status(500).json({ message: "Error al obtener reporte semanal" });
  }
};



