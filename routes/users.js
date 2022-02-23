const express = require("express");
const router = express.Router();

//user stuff can come in later.
router.get("/", (req, res) => {
console.log("user page");
res.send("user page");

});

router.get("/new", (req, res) => {
console.log("new user");
res.send("new user");

});

module.exports = router;