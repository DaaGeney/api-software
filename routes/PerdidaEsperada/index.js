const controller = require("./perdidaEsperada.controller");
const express = require("express");
const router = express.Router();
//rutas
router.post("/perdidaEsperada/:id", controller.calcularPerdidaEsperada);
router.get("/perdidaEsperada/:id", controller.obtenerValorPerdidaEsperada);
router.put("/perdidaEsperada/:id", controller.calcularPerdidaEsperada);
router.delete("/perdidaEsperada/:id", controller.eliminarPerdidaEsperada);
router.get("/perdidaEsperada/:id/recuperacion",controller.recuperacionPerdidaEsperada)


module.exports = router;