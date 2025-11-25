const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth.routes');
const compradorRoutes = require('./routes/comprador.routes');
const tipoRoutes = require('./routes/tipo.routes');
const especieRoutes = require('./routes/especie.routes');
const loteRoutes = require('./routes/lote.routes');
const compraRoutes = require('./routes/compra.routes');
const reporteRoutes = require('./routes/reporte.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/compradores', compradorRoutes);
app.use('/api/tipos', tipoRoutes);
app.use('/api/especies', especieRoutes);
app.use('/api/lotes', loteRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/reportes', reporteRoutes);

app.use(errorHandler);

module.exports = app;
