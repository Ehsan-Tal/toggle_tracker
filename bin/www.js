#!/usr/bin/env node

const app = require("../app");
const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => console.log(`Server running on ${hostname}: ${port}/`));

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`));


/*
const {spawn} = require('child_process'); // this is to create a CLI process, so use this for the python.
const { response } = require('express');
*/
/*
const fs = require('fs'); // we might need to relocate this and related file management to another module.

fs.access("./toggle_tracker.json", err => {
    if (err) {
        return console.error(err);
    };
});

fs.readFile("./toggle_tracker.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log("Parsing !")
    obj = JSON.parse(data);
    //console.log(obj);
    //obj contains all the data, but it does not 
    console.log(obj["categories"][0]["components"][1]);
});
*/