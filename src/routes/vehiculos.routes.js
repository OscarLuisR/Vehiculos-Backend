const router = require('express').Router();
const vehiculoCtrl = require('../controllers/vehiculos.controller');
const { verificaToken, verificaPermisoUser, verificaParametrosPaginacion, verificaDatosRegistroVehiculo, verificaDatosUpdateVehiculo } = require('../middlewares/index'); // OJO OJO OJO

router.get('/', [verificaToken, verificaPermisoUser, verificaParametrosPaginacion], vehiculoCtrl.getVehiculos); // OJO OJO OJO
router.get('/:id', [verificaToken, verificaPermisoUser], vehiculoCtrl.getVehiculoId);
router.post('/', [verificaToken, verificaPermisoUser, verificaDatosRegistroVehiculo], vehiculoCtrl.createVehiculo);
router.put('/:id', [verificaToken, verificaPermisoUser, verificaDatosUpdateVehiculo], vehiculoCtrl.updateVehiculo);
router.delete('/:id', [verificaToken, verificaPermisoUser], vehiculoCtrl.deleteVehiculo);

module.exports = router;