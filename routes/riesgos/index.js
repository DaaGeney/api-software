const express = require("express");
const router = express.Router();
const controller = require("./riesgos.controller");
const { validateToken } = require("../../utils/auth");

router.post("/riesgos", validateToken, controller.crearRiesgo);
router.get("/riesgos/:company", validateToken, controller.obtenerRiesgos);
//router.get("/riesgos/:id", controller.obtenerRiesgo);
router.put("/riesgos/:id", validateToken, controller.modificarRiesgo);
router.delete("/riesgos/:id", validateToken, controller.eliminarRiesgo);
router.post(
  "/perdidaEsperada/:id",
  validateToken,
  controller.calcularPerdidaEsperada
);
router.get(
  "/perdidaEsperada/:id",
  validateToken,
  controller.obtenerValorPerdidaEsperada
);

module.exports = router;
