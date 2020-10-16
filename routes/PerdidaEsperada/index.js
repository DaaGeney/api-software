const controller = require("./perdidaEsperada.controller");
const express = require("express");
const { route } = require("../holaMundo");
const router = express.Router();

router.get("/", controller.perdidaEsperada);
router.get("/recuperacion",controller.recuperacionPe);


module.exports = router;