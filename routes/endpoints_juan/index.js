const controller = require("./riesgos.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../../utils/auth");

router.get(
  "/riesgoCredito/:id/registros",
  validateToken,
  controller.obtenerRegistros
);
router.get("/riesgoCredito/:id/mapa", validateToken, controller.generarMapa);

module.exports = router;
