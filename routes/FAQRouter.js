const express = require("express");
const router = express.Router();
const FAQ_controller = require('../controllers/FAQController');


router.get("/", FAQ_controller.index);


module.exports = router;