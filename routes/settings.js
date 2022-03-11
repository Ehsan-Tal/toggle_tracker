const express = require("express");
const router = express.Router();

const settings_controller = require("../controllers/settingsController.js")

router.get("/", settings_controller.index);

module.exports = router;