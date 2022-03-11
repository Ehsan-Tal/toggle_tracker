const express = require("express");
const router = express.Router();

const stats_controller = require('../controllers/statsController.js')

router.get("/", stats_controller.index);



module.exports = router;