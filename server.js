const express = require('express');
const {spawn} = require('child_process');
const fs = require('fs');
  
//const { response } = require('express');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use( express.static(__dirname + '/public') );

// we can use fs to gather and send the JSON file after we figure out the python.

// Collects the JSON object after a button press and passes it to the python.
app.use(
    express.urlencoded({
        extended: true
    })
);

app.use( express.json() );

app.listen(port, hostname, () => console.log(`Server running on ${hostname}: ${port}/`));

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`));
