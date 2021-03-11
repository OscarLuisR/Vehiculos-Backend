const { Router } = require('express');
const routes = Router();

// Routes
routes.use('/api/auth', require('./auth.routes'));
routes.use('/api/vehiculos', require('./vehiculos.routes'));

module.exports = routes;