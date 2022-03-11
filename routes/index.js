const express = require("express");
const router = express.Router();

const toggles_controller = require("../controllers/togglesController");

router.get("/", toggles_controller.index);

router.post("/", toggles_controller.index);

router.post("/tracker-submit", toggles_controller.toggle_send);

module.exports = router;
