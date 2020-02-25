const port = 3000;
const http = require('http');

const serverHandle = require("../src/app.js");
const server = http.createServer(serverHandle);

server.listen(port, () => {
    console.log('服务已启动在本地端口:' + port);
});