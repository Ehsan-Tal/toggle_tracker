const express = require("express");
const router = express.Router();
const toggles_controller = require("../controllers/trackerController");
const {verifyToken, verifyTokenStrict} = require("../authentication.js");


router.get("/", verifyToken, toggles_controller.index);

router.get("/collect", verifyToken, toggles_controller.collectUserToggles);

router.post("/submit", verifyTokenStrict, toggles_controller.submitUserToggles);


module.exports = router;