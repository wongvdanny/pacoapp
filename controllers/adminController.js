// controllers/adminController.js
const renderAdminPanel = (req, res) => {
    const tenantUrl = req.params.tenantUrl;  // Obtener el nombre del tenant, como 'casa-muiz'
    console.log('Renderizando panel para tenant:', tenantUrl);  // Para verificar el valor de tenantUrl
  
    // Renderiza la vista de admin, pasando tenantUrl si necesitas usarlo dentro de la vista
    res.render('admin/index', { tenantUrl });
  };
  
  module.exports = { renderAdminPanel };
  