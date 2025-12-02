const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTRO
exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ message: "Usuario ya existe" });

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      nombre,
      email,
      password: hash
    });

    await user.save();
    res.status(201).json({ message: "Usuario creado correctamente" });

  } catch (err) {
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        nombre: user.nombre,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

