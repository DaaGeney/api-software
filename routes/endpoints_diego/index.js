const controller = require("./riesgos.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../../utils/auth");

//URI get  perdida esperada ()
router.get(
  "/perdidaEsperada/:id/reporte",
  validateToken,
  controller.reportePerdidaEsperada
);
//URI get  all riesgos credito cualitativos
router.get("/riesgosCredito", validateToken, controller.obtenerRiesgos);
//URI Post riesgo de credito
router.post("/riesgoCredito/:id", validateToken, controller.crearRiesgoCredito);

module.exports = router;
