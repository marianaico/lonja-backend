require('dotenv').config();
const { connectDB } = require('./config/db');
const app = require('./app');

const port = process.env.PORT || 8080;

(async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Servidor conectado en puerto ${port}`));
  } catch (e) {
    console.error('Error al iniciar servidor:', e);
    process.exit(1);
  }
})();
