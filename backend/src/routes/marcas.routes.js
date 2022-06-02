const router = require("express").Router();
const marcas = require("../controllers/marcas.controller");

router.get("/", marcas.getMarcas);

module.exports = router;