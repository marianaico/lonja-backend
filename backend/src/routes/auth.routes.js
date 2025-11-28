const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Usuario ya registrado" });

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el usuario
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (err) {
    console.error("🔥 ERROR REGISTER:", err);
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Crear JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("🔥 ERROR LOGIN:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});


module.exports = router;
