const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next){
    console.log("initial get");
    res.render("index", {title:" Ehi\'s Two by Two Toggle Tracker"});
    //res.send("index"); // send this eventually: Ehi\'s Two by Two Toggle Tracker
});

router.post("/", (req, res) => {
    if (req) {console.log("request received")};
    console.log(req.title);
    //console.log(res);
});

module.exports = router;
