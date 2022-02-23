const express = require("express");
const router = express.Router();

// this is to view the data in the form of graphs, etc.

router.get("/", (req, res) => {
    console.log("The analytics page");
    res.send("analytics page");
    
    });

module.exports = router;