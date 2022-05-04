#!/usr/bin/env node
const app = require("../app");
const hostname = '127.0.0.1';

const fs = require("fs");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.listen(port, () => console.log(`App available on http://localhost:${port}`));

process.on('uncaughtException', (err, origin) => {
    fs.writeSync(
        process.stderr.fd,
        `Caught exception: ${err}\n` +
        `Exception origin: ${origin}`
    );
});
