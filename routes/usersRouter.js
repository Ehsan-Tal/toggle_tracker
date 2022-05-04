const express = require("express");
const router = express.Router();
const {verifyTokenStrict, verifyToken} = require("../authentication.js");
const users_controller = require('../controllers/usersController.js');


// auth fail gets them the default screen.
router.get("/", verifyToken, users_controller.index);

router.post("/create", users_controller.createNewUser);

router.post("/login", users_controller.loginUser);

router.get("/logout", verifyTokenStrict, users_controller.logout);


module.exports = router;