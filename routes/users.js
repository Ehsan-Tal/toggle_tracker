const express = require("express");
const router = express.Router();

let users_controller = require('../controllers/usersController');

//user stuff can come in later.
router.get("/", users_controller.index);

router.post("/", users_controller.index);

router.post("/create", users_controller.user_create_post);

router.post("/log-in", users_controller.user_log_in_post);

router.get("/log-out", users_controller.user_log_out);

module.exports = router;