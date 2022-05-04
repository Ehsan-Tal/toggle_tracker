const express = require("express");
const router = express.Router();
const {verifyToken} = require("../authentication.js");
const settings_controller = require("../controllers/settingsController.js");


// auth fail gets them the default screen.
router.get("/", verifyToken, settings_controller.index);

router.get("/collect", settings_controller.collectUserSettings);

router.post("/submit", settings_controller.submitUserSettings);


module.exports = router;