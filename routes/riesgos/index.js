const express = require("express");
const router = express.Router();
const controller = require("./riesgos.controller");

router.post("/riesgos", controller.crearRiesgo);
router.get("/riesgos", controller.obtenerRiesgos);
router.get("/riesgos/:id", controller.obtenerRiesgo);
router.put("/riesgos/:id", controller.modificarRiesgo);
router.delete("/riesgos/:id", controller.eliminarRiesgo);
router.post("/perdidaEsperada/:id", controller.calcularPerdidaEsperada);
router.get("/perdidaEsperada/:id", controller.obtenerValorPerdidaEsperada);

module.exports = router;
