const { verificaDatosLogin, verificaToken, verificaPermisoAdmin, verificaPermisoUser, verificaPermisoGuest } = require('./verificaAuth');
const { verificaDatosRegistroVehiculo, verificaDatosUpdateVehiculo, verificaParametrosPaginacion } = require('./verificaVehiculo'); // OJO OJO OJO

module.exports = {
    verificaDatosLogin,
    verificaToken,
    verificaPermisoAdmin, 
    verificaPermisoUser,
    verificaPermisoGuest,
    verificaDatosRegistroVehiculo, 
    verificaDatosUpdateVehiculo,
    verificaParametrosPaginacion    // OJO OJO OJO
};