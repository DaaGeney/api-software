const express = require("express");
const router = express.Router();
const controller = require("./auth.controller");

router.post("/register", controller.registerCompany);
router.post("/login", controller.logIn);

module.exports = router;
