const express = require('express');
const { createTenant, loginTenant } = require('../controllers/tenantController'); // Importar el controlador
const router = express.Router();

// Ruta para crear un tenant
router.post('/', createTenant);

// Ruta para login de tenant
router.post('/login', loginTenant);  // Añadir esta ruta

module.exports = router;
