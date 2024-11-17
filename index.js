// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const tenantRouter = require('./routes/tenantRoutes');
const adminRouter = require('./routes/adminRoutes');  // Asegúrate de importar adminRoutes correctamente
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos principal 'pacobase'
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Conectado a la base de datos principal (pacobase)');
  })
  .catch((err) => {
    console.log("Error de conexión a la base de datos principal: ", err);
    process.exit(1); // Salir si no se puede conectar
  });

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para manejar datos enviados desde formularios
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/tenants', tenantRouter);
app.use('/admin', adminRouter);  // Asegúrate de usar el router para admin
console.log(adminRouter);
// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Página de login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
