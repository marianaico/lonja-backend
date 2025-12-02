const Compra = require("../models/Compra");

exports.crearCompra = async (req, res) => {
  try {
    const { productos } = req.body;

    if (!productos || productos.length === 0) {
      return res.status(400).json({ message: "No hay productos" });
    }

    let total = 0;
    productos.forEach(p => {
      total += p.precio * (p.cantidad || 1);
    });

    const nuevaCompra = new Compra({
      usuario: req.user.id,
      productos,
      total
    });

    await nuevaCompra.save();
    res.status(201).json(nuevaCompra);

  } catch (error) {
    res.status(500).json({ message: "Error al guardar compra" });
  }
};


exports.misCompras = async (req, res) => {
  try {
    const compras = await Compra.find({ usuario: req.user.id })
      .sort({ fecha: -1 });

    res.json(compras);

  } catch (error) {
    res.status(500).json({ message: "Error al obtener compras" });
  }
};


exports.todas = async (req, res) => {
  try {
    const compras = await Compra.find()
      .populate("usuario", "nombre email")
      .sort({ fecha: -1 });

    res.json(compras);

  } catch (error) {
    res.status(500).json({ message: "Error al obtener compras" });
  }
};

