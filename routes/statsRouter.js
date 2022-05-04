const express = require("express");
const router = express.Router();
const {verifyToken} = require("../authentication.js");
const stats_controller = require('../controllers/statsController.js')


// auth fail gets them the default screen.
router.get("/", verifyToken, stats_controller.index);

router.get("/collect", stats_controller.collectUserStats);

router.post("/practice", stats_controller.practice);

module.exports = router;