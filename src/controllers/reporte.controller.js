const Reporte = require('../models/Reporte');

exports.diario = async (req, res) => {
  try {
    const reportes = await Reporte.find().sort({ fecha: -1 });
    res.json(reportes);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener reportes" });
  }
};

exports.crearDiario = async (req, res) => {
  try {
    const { fecha, ventas } = req.body;

    if (!fecha || !ventas || ventas.length === 0) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    let totalVentas = 0;
    ventas.forEach(v => totalVentas += v.subtotal);

    const existe = await Reporte.findOne({ fecha });
    if (existe) {
      return res.status(400).json({ message: "Ya existe un reporte para esta fecha" });
    }

    const nuevo = new Reporte({
      fecha,
      ventas,
      totalVentas
    });

    await nuevo.save();
    res.status(201).json(nuevo);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al guardar reporte" });
  }
};

exports.reporteMensual = async (req, res) => {
  const { anio, mes } = req.params;

  const inicio = new Date(anio, mes - 1, 1);
  const fin = new Date(anio, mes, 0, 23, 59, 59);

  try {
    const reportes = await Reporte.find({
      fecha: { $gte: inicio, $lte: fin }
    });

    let totalMes = 0;
    reportes.forEach(r => totalMes += r.totalVentas);

    res.json({ reportes, totalMes });

  } catch (err) {
    res.status(500).json({ message: "Error al generar reporte mensual" });
  }
};



