const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const linkRoutes = require('./routes/linkRoutes');

const app = express();

// Middlewares globales
app.use(cors()); // Permitir solicitudes desde el frontend
app.use(bodyParser.json()); // Parsear JSON en las solicitudes

// Rutas principales
app.use('/api/links', linkRoutes); // Endpoints para manejar enlaces

// Manejo de errores básicos
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

module.exports = app;