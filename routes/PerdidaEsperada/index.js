const controller = require("./perdidaEsperada.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../../utils/auth");

//rutas
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
router.get("/perdidaEsperada", validateToken, controller.obtenerResultados);
router.put(
  "/perdidaEsperada/:id",
  validateToken,
  controller.calcularPerdidaEsperada
);
router.delete(
  "/perdidaEsperada/:id",
  validateToken,
  controller.eliminarPerdidaEsperada
);
router.get(
  "/perdidaEsperada/:id/recuperacion",
  validateToken,
  controller.recuperacionPerdidaEsperada
);

module.exports = router;
