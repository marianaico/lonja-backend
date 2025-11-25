require('dotenv').config();
const { connectDB } = require('../src/config/db');
const User = require('../src/models/User');
const Tipo = require('../src/models/Tipo');
const Especie = require('../src/models/Especie');
const Comprador = require('../src/models/Comprador');
const Lote = require('../src/models/Lote');

(async () => {
  try {
    await connectDB();

    // Usuario admin
    const adminEmail = 'admin@lonja.local';
    const admin = await User.findOne({ email: adminEmail }) || await User.create({
      email: adminEmail, password: 'Admin123!', role: 'admin'
    });
    console.log('Admin:', admin.email);

    // Tipos
    const tipos = ['Pescado', 'Marisco'];
    const tiposDocs = [];
    for (const nombre of tipos) {
      const t = await Tipo.findOne({ nombre }) || await Tipo.create({ nombre });
      tiposDocs.push(t);
    }
    console.log('Tipos:', tiposDocs.map(t => t.nombre));

    // Especies
    const especiesData = [
      { nombre: 'Mojarra', tipo: tiposDocs.find(t => t.nombre === 'Pescado')._id },
      { nombre: 'Camarón', tipo: tiposDocs.find(t => t.nombre === 'Marisco')._id }
    ];
    for (const e of especiesData) {
      await Especie.findOne(e) || await Especie.create(e);
    }

    // Compradores
    const compradoresData = [
      { codigoCmp: 'CMP001', nombre: 'Juan', correo: 'juan@example.com' },
      { codigoCmp: 'CMP002', nombre: 'Ana', correo: 'ana@example.com' }
    ];
    for (const c of compradoresData) {
      await Comprador.findOne({ codigoCmp: c.codigoCmp }) || await Comprador.create(c);
    }

    // Lotes
    const hoy = new Date();
    await Lote.create({ numeroCajas: 10, precioKgSalida: 120, fecha: hoy });
    await Lote.create({ numeroCajas: 5, precioKgSalida: 150, fecha: hoy });

    console.log('Seed completado');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
