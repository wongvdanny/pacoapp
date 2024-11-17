const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  CIF_DNI: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dbName: {
    type: String,
    required: true
  },
  url_tenant: {
    type: String,  // Campo para la URL del subdominio
    required: true
  }
});

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
