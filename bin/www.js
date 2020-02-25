const port = 3000;
const http = require('http');

const serverHandle = require("../src/app.js");


const server = http.createServer(serverHandle);
server.listen(port);