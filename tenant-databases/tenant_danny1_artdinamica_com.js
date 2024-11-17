const mongoose = require('mongoose');
const newConnection = mongoose.createConnection('mongodb://localhost:27017/pacobase/tenant_danny1_artdinamica_com');

module.exports = newConnection;