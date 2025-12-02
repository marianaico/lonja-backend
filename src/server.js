require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const reporteRoutes = require("./routes/reporte.routes");

const app = express();

app.use(cors({
  origin: [
    "https://lonja-frontend.onrender.com",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/reportes", reporteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Servidor activo"));


