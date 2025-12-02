const Reporte = require("../models/Reporte");

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
    console.error(error);
    res.status(500).json({ message: "Error al guardar reporte" });
  }
};

exports.diario = async (req, res) => {
  try {
    const reportes = await Reporte.find().sort({ fecha: -1 });
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reportes" });
  }
};
