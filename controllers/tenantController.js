const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importar bcryptjs
const Tenant = require('../models/Tenant');

// Función para generar el url_tenant
const generateUrlTenant = (restaurantName) => {
  // Convertir a minúsculas, reemplazar espacios y caracteres especiales
  return restaurantName
    .toLowerCase()
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/[^\w\s-]/g, '') // Eliminar caracteres no alfanuméricos
    .replace(/\s+/g, '-') // Reemplazar espacios por guiones
    .replace(/-+/g, '-'); // Eliminar guiones repetidos
};

const createTenant = async (req, res) => {
  try {
    const { restaurantName, ownerName, CIF_DNI, email, phone, address, password } = req.body;
    
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10); // Generar un 'salt' para la encriptación
    const hashedPassword = await bcrypt.hash(password, salt); // Encriptar la contraseña

    const dbName = `tenant_${email.replace(/[@.]/g, '_')}`;  // Nombre único de la base de datos
    const newDbUri = `${process.env.DB_URI}/${dbName}`; // URI de conexión a la base de datos del tenant

    // Generar el url_tenant
    const urlTenant = generateUrlTenant(restaurantName);

    // Crear un nuevo Tenant en la base de datos principal
    const tenant = new Tenant({
      restaurantName,
      ownerName,
      CIF_DNI,
      email,
      phone,
      address,
      password: hashedPassword, // Guardar la contraseña encriptada
      dbName,
      url_tenant: urlTenant // Guardar el campo url_tenant
    });

    // Guardar el tenant
    await tenant.save();

    // Crear la conexión a la base de datos del tenant
    const newConnection = mongoose.createConnection(newDbUri);
    newConnection.on('open', () => {
      console.log(`Conectado a la base de datos ${dbName}`);
    });

    // Responder al cliente después de guardar el tenant
    res.status(201).json({ message: 'Tenant creado exitosamente', tenant });
    
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: error.message });
  }
};

const loginTenant = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el tenant en la base de datos principal por el correo electrónico
    const tenant = await Tenant.findOne({ email });

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant no encontrado' });
    }

    // Comparar la contraseña ingresada con la encriptada en la base de datos
    const isMatch = await bcrypt.compare(password, tenant.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Si las credenciales son correctas, redirigir al path correspondiente
    const tenantUrl = tenant.url_tenant; // Usar el campo url_tenant para redirigir
    res.status(200).json({ 
      message: 'Login exitoso', 
      redirectTo: `http://localhost:3000/${tenantUrl}/admin`  // Redirigir al path correspondiente
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: error.message });
  }
};


// Exportar ambas funciones
module.exports = { createTenant, loginTenant };
