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
    const { fecha, ventas, compras } = req.body;

    if (!fecha || !ventas || !compras) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    let totalVentas = 0;
    ventas.forEach(v => totalVentas += v.subtotal);

    const existe = await Reporte.findOne({ fecha });
    if (existe) {
      return res.status(400).json({ message: "Ya existe reporte para esta fecha" });
    }

    const nuevo = new Reporte({
      fecha,
      ventas,
      totalVentas,
      compras
    });

    await nuevo.save();
    res.status(201).json(nuevo);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al guardar reporte" });
  }
};


