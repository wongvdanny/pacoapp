// routes/adminRoutes.js
const express = require('express');
const { renderAdminPanel } = require('../controllers/adminController');
const router = express.Router();

// Ruta para el panel administrativo del tenant, usando un parámetro dinámico
router.get('/:tenantUrl/admin', renderAdminPanel);

module.exports = router;
