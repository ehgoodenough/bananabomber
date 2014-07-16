var express = require("express");

server = express();
server.use(express.static(__dirname));
server.listen(process.env.PORT || 8080);