const router = require("express").Router();
const tiposCarga = require("../controllers/tiposCarga.controller");

router.get("/", tiposCarga.getTiposCarga);

module.exports = router;