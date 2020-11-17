
const controller = require("./riesgos.controller");
const express = require("express");
const router = express.Router();

//URI get  perdida esperada ()
router.get("/perdidaEsperada/:id/reporte", controller.reportePerdidaEsperada);
//URI get  all riesgos credito cualitativos
router.get("/riesgosCredito", controller.obtenerRiesgos);
//URI Post riesgo de credito
router.post("/riesgoCredito/:id", controller.crearRiesgoCredito);


module.exports = router;