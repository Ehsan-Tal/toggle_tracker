#!/usr/bin/env node

const app = require("../app");
const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => console.log(`Server running on ${hostname}: ${port}/`));

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`));
