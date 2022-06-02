const router = require("express").Router();
const vehiculo = require("../controllers/vehiculos.controller");

router.get("/", vehiculo.getAllVehiculos);
router.get("/:id", vehiculo.getOneVehiculo);
router.post("/", vehiculo.insertVehiculo);
router.delete("/:id", vehiculo.deleteVehiculo);
router.patch("/", vehiculo.updateVehiculo);

module.exports = router;